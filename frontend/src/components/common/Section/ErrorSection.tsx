import Section from "./Section";
import { CiCircleAlert } from "react-icons/ci";

interface ErrorSectionProps {
  refetch?: () => void;
  label?: string;
}

// Simpler wrapper over the Section component
const ErrorSection = ({ refetch, label }: ErrorSectionProps) => {
  return (
    <Section
      error
      Icon={CiCircleAlert}
      text={label || "Se ha producido un error, por favor intente nuevamente."}
      refetch={refetch}
    />
  );
};

export default ErrorSection;
