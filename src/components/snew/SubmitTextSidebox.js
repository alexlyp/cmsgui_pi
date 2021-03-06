import React from "react";
import actionsConnector from "../../connectors/actions";

const SubmitTextSidebox = ({ Link, loggedInAsEmail }) => {
  return loggedInAsEmail ? (
    <div className="spacer">
      <div className="sidebox submit submit-text">
        <div className="morelink">
          <Link
            className="login-required access-required"
            data-event-action="submit"
            data-event-detail="self"
            data-type="subreddit"
            href="/invoices/new"
          />
          <div className="nub" />
        </div>
      </div>
    </div>
  ) : null;
};
export default actionsConnector(SubmitTextSidebox);
