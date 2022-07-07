import Layout from "@components/dao/Layout";
import CreateHeader from "@components/dao/proposal/Header";
import { Box, Button, Modal } from "@mui/material";
import * as React from "react";
import BalanceIcon from "@mui/icons-material/Balance";
import { useRouter } from "next/router";
import Link from "next/link";
import ProposalContext from "@lib/dao/proposal/ProposalContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ProposalApi from "@lib/dao/proposal/ProposalApi";
import GeneralInformation from "@components/dao/proposal/GeneralInformation";
import { IFile } from "@lib/creation/CreationApi";
import ProposalPlaceholder from "@public/dao/discussion-banner-placeholder.png";
import ProposalImage from "@components/dao/proposal/ProposalImage";
import ProposalVote from "@components/dao/proposal/ProposalVote";
import Content from "@components/dao/proposal/Context";
import { modalBackground } from "@components/utilities/modalBackground";
import LoadingButton from "@mui/lab/LoadingButton";
import PublishIcon from "@mui/icons-material/Publish";

export interface IProposal {
  id?: number;
  name: string;
  image: IFile;
  category: string;
  content: string;
}

const CreateProposal: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;
  const [value, setValue] = React.useState<IProposal>({
    name: "",
    image: {
      url: ProposalPlaceholder.src,
      file: undefined,
    },
    category: "",
    content: "",
  });
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const api = new ProposalApi(
    context.api.alert,
    context.api.setAlert,
    value,
    setValue
  );
  const [publish, setPublish] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <ProposalContext.Provider value={{ api }}>
      <Layout>
        <CreateHeader type="proposal" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: "1px solid",
            borderColor: "border.main",
            backgroundColor: "fileInput.outer",
            pl: "0",
            borderRadius: ".3rem",
            pt: ".75rem",
            pb: ".75rem",
          }}
        >
          <Box
            sx={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BalanceIcon sx={{ fontSize: "2rem" }} color="primary" />
          </Box>
          <Box sx={{ width: "75%", fontSize: "1.3rem", fontWeight: 400 }}>
            Create a proposal
            <Box sx={{ fontSize: ".8rem", color: "text.light" }}>
              Provide users with different options to vote on, and the proposal
              will either be approved or declined. Keep in mind, once you create
              a proposal, it can't be edited or deleted.
            </Box>
          </Box>
          <Box sx={{ display: "flex", width: "15%", justifyContent: "center" }}>
            <Link href={id === undefined ? "/dao/create" : `/dao/${id}/create`}>
              <Button size="small">Change</Button>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "1.5rem",
            mb: "1.5rem",
            borderBottom: 1,
            borderColor: "border.main",
          }}
        />
        <GeneralInformation />
        <ProposalImage />
        <Box
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "border.main",
            mt: "1.5rem",
          }}
        />
        <ProposalVote />
        <Content />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: "1rem",
            mb: ".5rem",
          }}
        >
          <Button variant="outlined" sx={{ width: "50%", mr: "1rem" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={() => {
              console.log(value, "call api here...");
              setPublish(true);
            }}
          >
            Publish
          </Button>
        </Box>
        <Modal
          open={publish}
          onClose={() => setPublish(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalBackground, width: "35rem" }}>
            <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
              You are about to publish a proposal
            </Box>
            <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
              Once published, a proposal can't be edited or deleted.
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mt: "1rem",
              }}
            >
              <Box sx={{ ml: "auto" }}>
                {!loading && (
                  <Button sx={{ mr: "1rem" }} onClick={() => setPublish(false)}>
                    Cancel
                  </Button>
                )}
                <LoadingButton
                  onClick={() => (loading ? null : setLoading(true))}
                  startIcon={<PublishIcon />}
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                >
                  Publish
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Layout>
    </ProposalContext.Provider>
  );
};

export default CreateProposal;
