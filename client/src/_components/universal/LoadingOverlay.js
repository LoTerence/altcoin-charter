import { SpinnerIcon } from "../icons";

const LoadingOverlay = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loader">
          <SpinnerIcon className="w-32 h-32" />
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
