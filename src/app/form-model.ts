export const formModel: any = {
  Id: 1,
  Title: "Create Dynamic Form",
  PostUrl: "SaveFormValues",
  FormItems: {
    username: {
      Name: "username",
      Type: "text",
      FormItemType: "input",
      Value: "",
      PlaceHolder: "Username",
      Label: "Username",
      SortOrder: 0,
      Validations: {
        required: "'Username' can not be empty"
      }
    },
    name: {
      Name: "name",
      Type: "text",
      FormItemType: "input",
      Value: "",
      PlaceHolder: "Name",
      Label: "Name",
      SortOrder: 1,
      Validations: {
        required: "'Name' can not be empty"
      }
    },
    surname: {
      Name: "surname",
      Type: "text",
      FormItemType: "input",
      Value: "",
      PlaceHolder: "Surname",
      Label: "Surname",
      SortOrder: 2,
      Validations: {
        required: "'Surname' can not be empty"
      }
    },
    avatar: {
      Name: "avatar",
      Type: "file",
      FormItemType: "input",
      Value: "",
      PlaceHolder: "",
      Label: "",
      SortOrder: 3,
      Validations: {
        required: "'File' can not be empty"
      }
    },
    ok: {
      Type: "submit",
      FormItemType: "button",
      Label: "Save"
    },
    clear: {
      Type: "reset",
      FormItemType: "button",
      Label: "Clear"
    }
  }
};
