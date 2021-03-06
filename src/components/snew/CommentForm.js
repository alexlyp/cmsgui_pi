import React from "react";
import LinkComponent from "./Link";
import Message from "../Message";
import MarkdownEditorField from "../Form/Fields/MarkdownEditorField";
import MarkdownHelp from "../MarkdownHelp";

const CommentForm = ({
  Link = LinkComponent,
  isPostingComment,
  isShowingMarkdownHelp,
  error,
  thingId,
  onSave,
  onToggleMarkdownHelp,
  loggedInAsEmail,
  userCanExecuteActions,
  getVoteStatus,
  token,
  showContentPolicy = false,
  value,
  onChange,
  onClose,
  hide = false
}) => {
  const isVotingFinished = getVoteStatus(token);
  const isProposalAbandoned = false;
  return loggedInAsEmail ? (
    <React.Fragment>
      <form
        className="usertext cloneable warn-on-unload"
        style={hide ? { display: "none" } : {}}
        onSubmit={onSave}
      >
        {error ? (
          <Message type="error" header="Error creating comment" body={error} />
        ) : null}
        <input name="parentid" type="hidden" defaultValue={thingId} />
        <div className="usertext-edit md-container">
          {isPostingComment && <h2>Posting comment...</h2>}
          {!isPostingComment && !isVotingFinished && !isProposalAbandoned ? (
            <div className="md">
              <MarkdownEditorField
                input={{ value: value, onChange: onChange }}
                toggledStyle
              />
            </div>
          ) : isVotingFinished ? (
            <Message height="70px" type="info">
              <span>
                Voting has finished for this proposal. New comments and comment
                votes are not allowed.
              </span>
            </Message>
          ) : isProposalAbandoned ? (
            <Message height="70px" type="info">
              <span>
                This proposal has been abandoned. New comments and comment votes
                are not allowed.
              </span>
            </Message>
          ) : null}
          {!isPostingComment &&
          getVoteStatus(token) &&
          !isVotingFinished &&
          !isProposalAbandoned ? (
            <div className="bottom-area">
              <span className="help-toggle toggle">
                <a
                  className="option active"
                  tabIndex={100}
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    onToggleMarkdownHelp();
                    e.preventDefault();
                  }}
                >
                  formatting help
                </a>
                <a className="option">hide help</a>
              </span>
              {showContentPolicy && (
                <Link
                  className="reddiquette"
                  href="/help/contentpolicy"
                  tabIndex={100}
                  target="_blank"
                >
                  content policy
                </Link>
              )}
              <div className="usertext-buttons">
                <button
                  className={`togglebutton access-required${
                    !userCanExecuteActions ? " not-active disabled" : ""
                  }`}
                  type="submit"
                  style={{ marginBottom: "5px" }}
                  disabled={!userCanExecuteActions}
                >
                  save
                </button>
                {(onClose && (
                  <button
                    className={`togglebutton access-required${
                      !userCanExecuteActions ? " not-active disabled" : ""
                    }`}
                    onClick={() => onClose()}
                    type="button"
                    disabled={!userCanExecuteActions}
                  >
                    cancel
                  </button>
                )) ||
                  null}
              </div>
            </div>
          ) : null}
        </div>
        {isShowingMarkdownHelp && <MarkdownHelp />}
      </form>
    </React.Fragment>
  ) : null;
};

export default CommentForm;
