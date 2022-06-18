import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from './SubmitButton';

interface InviteLinkProps {
  url: string;
  route: string;
}
function CopyInviteLink(props: InviteLinkProps) {
  const [copied, setCopied] = React.useState(false);

  return (
    <CopyToClipboard
      text={props.url}
      onCopy={() => {
        setCopied(true);
        toast.success('Linked Copied!!');
      }}
    >
      <div className="bg-gray-100 hover:bg-slate-100 py-4 px-2 mt-4 shadow-inner rounded cursor-pointer">
        <Link to={props.route} className="hover:underline hover:text-black text-gray-700">
          {props.url}
        </Link>
        <Button text={copied ? 'Link Copied' : 'Copy link'} type="button" />
      </div>
    </CopyToClipboard>
  );
}

export default CopyInviteLink;
