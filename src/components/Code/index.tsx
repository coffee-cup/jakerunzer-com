import Highlight, { defaultProps } from "prism-react-renderer";
import * as React from "react";

const Code = ({ codeString, language }) => {
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
