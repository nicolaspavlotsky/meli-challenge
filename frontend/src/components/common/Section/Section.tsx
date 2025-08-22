import { APP_ROUTES } from "@/routing/routes";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface SectionProps {
  Icon: IconType;
  iconSize?: number;
  text: string;
  goBackLink?: boolean;
  error?: boolean;
  refetch?: () => void;
}

// Used to display information about a page, usually status info like "Not found" or "Error searching", etc...
const Section = ({
  Icon,
  iconSize = 72,
  text,
  goBackLink = false,
  error = false,
  refetch,
}: SectionProps) => {
  return (
    <div
      className={`section ${error ? "error" : ""}`}
      role="status"
      data-testid="section"
    >
      <Icon size={iconSize} className="section_icon" />
      <p className="section_text">{text}</p>
      {goBackLink && (
        <Link to={APP_ROUTES.home} className="section_link">
          Volver al inicio
        </Link>
      )}
      {refetch && (
        <button onClick={refetch} className="section_button">
          Reintentar
        </button>
      )}
    </div>
  );
};

export default Section;
