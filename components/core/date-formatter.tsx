import { parseISO, format as formatFn } from "date-fns";
import fr from "date-fns/locale/fr";

const locales = { fr };

const DateFormatter = ({
  dateString,
  format,
  locale,
}: {
  dateString: string;
  format: string;
  locale?: string;
}) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {formatFn(date, format, { locale: locales[locale] })}
    </time>
  );
};

export { DateFormatter };
