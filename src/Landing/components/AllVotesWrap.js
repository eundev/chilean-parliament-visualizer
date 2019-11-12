import React, { Component } from "react";
import MultiDropdownNavbar from "../../Navbars/MultiDropdownNavbar";
import ListRecentVotes from "../../Legislations/partials/components/ListRecentVotes";

class AllVotesWrap extends Component {
  render() {
    return (
      <div>
        <MultiDropdownNavbar></MultiDropdownNavbar>
        <br />
        <br />
        <ListRecentVotes limit={100}></ListRecentVotes>
      </div>
    );
  }
}

export default AllVotesWrap;
