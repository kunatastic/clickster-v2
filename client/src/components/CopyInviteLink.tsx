import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface InviteLinkProps {
  url: string;
}
function CopyInviteLink(props: InviteLinkProps) {
  const [copied, setCopied] = React.useState(false);

  return (
    <CopyToClipboard text={props.url} onCopy={() => setCopied(true)}>
      <div>
        <div className="">{props.url}</div>
        <span className=" text-2xl">{copied ? 'Link Copied' : 'Copy link'}</span>
      </div>
    </CopyToClipboard>
  );
}

export default CopyInviteLink;
