import NameForm from "./nameForm";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

const Settings = () => {
  return (
    <>
      <h1 className="mb-4">User Settings</h1>
      <NameForm />
      <EmailForm />
      <PasswordForm />
      <hr />
      <DeleteAccountForm />
    </>
  );
};

export default Settings;
