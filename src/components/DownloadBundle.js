import React, { Component } from "react";
import invoiceDownloadConnector from "../connectors/invoiceDownload";
import fileDownload from "js-file-download";
import { commentsToT1 } from "../lib/snew";

class DownloadBundle extends Component {
  constructor(props) {
    super(props);
    this.handleDownloadInvoice = this.handleDownloadInvoice.bind(this);
    this.handleDownloadComment = this.handleDownloadComment.bind(this);
  }

  handleDownloadInvoice() {
    const { invoice, serverPubkey } = this.props;
    const bundle = invoice;
    bundle.serverPubkey = serverPubkey;
    const data = JSON.stringify(bundle, null, 2);
    fileDownload(data, `${invoice.censorshiprecord.token}.json`);
  }

  handleDownloadComment() {
    const { invoiceComments, invoice } = this.props;
    const data = JSON.stringify(commentsToT1(invoiceComments), null, 2);
    fileDownload(data, `${invoice.censorshiprecord.token}-comments.json`);
  }

  render() {
    const t = this.props.type;

    return t === "proposal" ? (
      <a style={{ cursor: "pointer" }} onClick={this.handleDownloadInvoice}>
        {this.props.message || "Download Invoice Bundle"}
      </a>
    ) : t === "comments" ? (
      <a style={{ cursor: "pointer" }} onClick={this.handleDownloadComment}>
        {this.props.message || "Download Comments Bundle"}
      </a>
    ) : null;
  }
}

export default invoiceDownloadConnector(DownloadBundle);
