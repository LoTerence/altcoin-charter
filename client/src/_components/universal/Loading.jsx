import { SpinnerIcon } from "../icons";

const Loading = ({ isLoading = true }) => {
  return (
    <>
      {isLoading && (
        <div id="loader" className="loader">
          <SpinnerIcon className="w-32 h-32" />
        </div>
      )}
    </>
  );
};

export default Loading;
