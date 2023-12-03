import PrivateRoute from "../../_components/auth/PrivateRoute";
import NameForm from "./nameForm";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

const Settings = () => {
  return (
    <PrivateRoute>
      <div className="container h-100">
        <h2>User Settings</h2>
        <br />
        <NameForm />
        <br />
        <EmailForm />
        <br />
        <br />
        <PasswordForm />
        <hr />
        <DeleteAccountForm />
      </div>
    </PrivateRoute>
  );
};

export default Settings;
