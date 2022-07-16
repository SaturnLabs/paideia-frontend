import { IConfigContext } from "@lib/dao/dao-config/ConfigContext";
import { Box } from "@mui/material";
import React from "react";
import { GlobalContext } from "../../../lib/creation/Context";
import FileBanner from "../../utilities/FileBanner";
import { Subheader, Subtitle } from "../utilities/HeaderComponents";
import LabeledSwitch from "../utilities/LabeledSwitch";

const Banner: React.FC<{ context?: IConfigContext }> = (props) => {
  let globalContext =
    props.context === undefined
      ? React.useContext(GlobalContext)
      : props.context;

  let data = globalContext.api.data.design;
  let setData = (data: any) => {
    globalContext.api.setData({
      ...globalContext.api.data,
      design: data,
    });
  };

  const [url, setUrl] = React.useState<any>(data.banner.data.url);

  function handleImage(e: any) {
    let fileInput = e.currentTarget.files;
    if (fileInput && fileInput[0]) {
      if (fileInput.length != 1) return;
      if (fileInput[0].size > 1000000) {
        setData({
          ...data,
          banner: {
            ...data.banner,
            data: {
              ...data.banner.data,
              file: -1,
            },
          },
        });

        return;
      }

      var reader = new FileReader();
      reader.onload = function (_e: any) {
        setUrl(_e.target.result);
      };

      reader.readAsDataURL(fileInput[0]);
      setData({
        ...data,
        banner: {
          ...data.banner,
          data: {
            ...data.banner.data,
            file: fileInput[0],
          },
        },
      });
    }
  }

  React.useEffect(() => {
    setData({
      ...data,
      banner: {
        ...data.banner,
        data: {
          ...data.banner.data,
          url: url,
        },
      },
    });
  }, [url]);
  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderTopColor: "border.main",
        pt: "1rem",
        mt: "1rem",
      }}
    >
      <Box sx={{ width: "100%", mb: "1rem" }}>
        <Box sx={{ mb: ".5rem" }}>
          <Subheader title="Banner" />
        </Box>
        <Subtitle subtitle="You can choose to have a banner on your DAO homepage by simply enabling below and uploading a compatible file." />
      </Box>

      <LabeledSwitch
        title="Show banner"
        value={data.banner.show}
        onChange={() =>
          setData({
            ...data,
            banner: {
              ...data.banner,
              show: !data.banner.show,
            },
          })
        }
      />
      {data.banner.show && (
        <FileBanner
          file={data.banner.data === undefined ? "" : data.banner.data.file}
          fileUrl={data.banner.data === undefined ? "" : data.banner.data.url}
          handleImage={handleImage}
          id="banner-img-upload"
        />
      )}
    </Box>
  );
};

export default Banner;
