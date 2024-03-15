import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PillButton = ({
  className,
  icon,
  title,
}: {
  className?: string;
  icon: IconProp;
  title: string;
}) => {
  return (
    <button
      className={`flex items-center bg-dark-accent hover:bg-primary transition-colors py-2 px-4 rounded-full${
        className ? " " + className : ""
      }`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {title}
    </button>
  );
};

export default PillButton;
