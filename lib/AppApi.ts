import { AbstractApi } from "./utilities";
import { Theme } from "@mui/material";
import { CreationApi } from "./creation/CreationApi";
import { IAlerts } from "@components/utilities/Alert";
import { IDaoUserData, IDaoUserRes, IEditUser } from "./Interfaces";

export class AppApi extends AbstractApi {
  theme: Theme;
  setTheme: Function;
  daoData: any;
  setDaoData: Function;
  daoUserData: IDaoUserData;
  setDaoUserData: (val: IDaoUserData) => void;

  constructor(
    alert: IAlerts[],
    setAlert: (val: IAlerts[]) => void,
    theme: Theme,
    setTheme: Function,
    daoData: any,
    setDaoData: Function,
    daoUserData: IDaoUserData,
    setDaoUserData: (val: IDaoUserData) => void
  ) {
    super();
    this.alert = alert;
    this.setAlert = setAlert;
    this.theme = theme;
    this.setTheme = setTheme;
    this.daoData = daoData;
    this.setDaoData = setDaoData;
    this.daoUserData = daoUserData;
    this.setDaoUserData = setDaoUserData;
  }

  async editUser(data: IEditUser): Promise<any> {
    return this.put(`/users/details/${this.daoUserData.user_id}?dao_id=${this.daoUserData.dao_id}`, data)
  }

  async getDaoUser(): Promise<any> {
    let userId = localStorage.getItem("user_id");
    if (userId !== undefined && userId !== "" && this.daoData !== undefined) {
      return this.get<IDaoUserRes>(
        `/users/details/${userId}?dao_id=${this.daoData.id}`
      );
    }
    return null;
  }

  async getOrCreateDaoUser(): Promise<void> {
    let res = await this.getDaoUser();
    if (res !== null) {
      if (res === undefined) {
        try {
          // check for tokens here.....
          let creationRes = await this.post<IDaoUserRes>(
            "/users/create_user_profile?dao_id=" + this.daoData.id
          );
          this.setDaoUserData(creationRes.data);
          return;
        } catch (e) {
          this.error("Unable to add dao user");
          return;
        }
      }
      this.setDaoUserData(res.data);
      return;
    }
  }
}
