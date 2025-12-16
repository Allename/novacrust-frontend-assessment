import { icons } from "@/assets/icons";
import { ReactSVG } from "react-svg";

const BackButton = () => {
  const returnPage = () => {
    window.history.back();
  };

  return (
    <div
      className="flex text-[18px] items-center cursor-pointer font-semibold text-primary"
      onClick={returnPage}
    >
      <ReactSVG src={icons.arrowLeft} />
    </div>
  );
};

export default BackButton;
