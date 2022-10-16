import ReactMarkdown from "react-markdown";
import { Body } from "./Typography";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        p(props) {
          return <Body {...props} />;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
