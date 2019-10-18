var members = data.results[0].members;

// ↓ creating the glance table ↓

var tbody = document.getElementById("tbody1");

var statistics = {
  numberOfDemocrats: 0,
  numberOfRepublicans: 0,
  numberOfIndependents: 0,
  total: 0,

  democratsVotedWithParty: 0,
  republicansVotedWithParty: 0,
  independentsVotedWithParty: 0,
  totalVotedWithParty: 0
};

function createStatisticGlanceTable() {
  for (var r = 0; r < members.length; r++) {
    if (members[r].party === "D") {
      statistics.numberOfDemocrats++;
      if (typeof members[r].votes_with_party_pct !== "undefined") {
        statistics.democratsVotedWithParty += members[r].votes_with_party_pct;
      }
    } else if (members[r].party === "R") {
      statistics.numberOfRepublicans++;
      if (typeof members[r].votes_with_party_pct !== "undefined") {
        statistics.republicansVotedWithParty += members[r].votes_with_party_pct;
      }
    } else if (members[r].party === "I") {
      statistics.numberOfIndependents++;
      if (typeof members[r].votes_with_party_pct !== "undefined") {
        statistics.independentsVotedWithParty +=
          members[r].votes_with_party_pct;
      }
    }
  }
  statistics.totalVotedWithParty =
    (statistics.democratsVotedWithParty +
      statistics.republicansVotedWithParty +
      statistics.independentsVotedWithParty) /
    members.length;

  statistics.democratsVotedWithParty =
    statistics.democratsVotedWithParty / statistics.numberOfDemocrats;
  statistics.republicansVotedWithParty =
    statistics.republicansVotedWithParty / statistics.numberOfRepublicans;
  statistics.independentsVotedWithParty =
    statistics.independentsVotedWithParty / statistics.numberOfIndependents;
  statistics.total = members.length;

  statistics.democratsVotedWithParty =
    Math.floor(statistics.democratsVotedWithParty * 100) / 100;
  statistics.republicansVotedWithParty =
    Math.floor(statistics.republicansVotedWithParty * 100) / 100;
  statistics.independentsVotedWithParty =
    Math.floor(statistics.independentsVotedWithParty * 100) / 100;
  statistics.totalVotedWithParty =
    Math.floor(statistics.totalVotedWithParty * 100) / 100;
}
createStatisticGlanceTable();

tbody.innerHTML +=
  "<tr>" +
  "<td>" +
  "Republicans" +
  "</td>" +
  "<td>" +
  statistics.numberOfRepublicans +
  "</td>" +
  "<td>" +
  statistics.republicansVotedWithParty +
  " %" +
  "</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  "Democrats" +
  "</td>" +
  "<td>" +
  statistics.numberOfDemocrats +
  "</td>" +
  "<td>" +
  statistics.democratsVotedWithParty +
  " %" +
  "</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  "Independents" +
  "</td>" +
  "<td>" +
  statistics.numberOfIndependents +
  "</td>" +
  "<td>" +
  statistics.independentsVotedWithParty +
  " %" +
  "</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  "Total" +
  "</td>" +
  "<td>" +
  statistics.total +
  "</td>" +
  "<td>" +
  statistics.totalVotedWithParty +
  " %" +
  "</td>" +
  "</tr>";

// this would be the approach to create the tables in nodejs, so without strings

// var rows2 = document.createElement("tr")
// var cell1 = document.createElement("td")

// cell1.innerHTML = firstName;
// console.log(cell1)
// rows2.appendChild(cell1)
// console.log(rows2)
// tbody.appendChild(rows2)

// ↓ this is the second table on the attendance pages ↓

var table3 = "";
const arrEng = [];

if (
  document.title == "Senate Attendance" ||
  document.title == "House Attendance"
) {
  createAttendanceList();
}

function createAttendanceList() {
  for (r = 0; r < members.length; r++) {
    if (
      members[r].missed_votes != null &&
      members[r].votes_with_party_pct !== "undefined"
    ) {
      arrEng.push({
        missedVotes: members[r].missed_votes,
        name: members[r].first_name +
          " " +
          (members[r].middle_name || "") +
          (" " + members[r].last_name),
        missedVotesPercentage: members[r].missed_votes_pct
      });
    }
  }
  // ↓ this sorts arrEng into ascending order
  arrEng.sort((a, b) =>
    a.missedVotesPercentage < b.missedVotesPercentage ? 1 : -1
  );
  // ↓ this seems to be the easiest and shortest way  to do that ↓
  // list.sort((a, b) => (a.color > b.color) ? 1 : -1)
  var arrEngLeast = [];
  for (var r = 0; r < arrEng.length; r++) {
    if (arrEngLeast.length < arrEng.length * 0.1) {
      arrEngLeast.push(arrEng[r]);
    }
  }
  createEngLeastTable(arrEngLeast);

  // ↓ this is the third table on the senate-attendance page ↓
  arrEng.sort((a, b) =>
    a.missedVotesPercentage > b.missedVotesPercentage ? 1 : -1
  );

  // ↓ and here we have the most engaged 10 % ↓
  var arrEngMost = [];
  for (var r = 0; r < arrEng.length; r++) {
    if (arrEngMost.length < arrEng.length * 0.1) {
      arrEngMost.push(arrEng[r]);
    }
  }
  createEngMostTable(arrEngMost);
}

// ↓ this creates the actual table ↓

function createEngLeastTable(arr) {
  var leastTable = document.getElementById("leastEngaged");
  for (var r = 0; r < arr.length; r++) {
    table3 +=
      "<tr>" +
      "<td>" +
      arr[r].name +
      "</td>" +
      "<td>" +
      arr[r].missedVotes +
      "</td>" +
      "<td>" +
      arr[r].missedVotesPercentage +
      "</td>" +
      "</tr>";
  }
  leastTable.innerHTML = table3;
}

// var rows = members.length;

function createEngMostTable(arrEngMost) {
  var tableMost = document.getElementById("mostEngaged");
  var table2 = "";
  for (var r = 0; r < arrEngMost.length; r++) {
    table2 +=
      "<tr>" +
      "<td>" +
      arrEngMost[r].name +
      "</td>" +
      "<td>" +
      arrEngMost[r].missedVotes +
      "</td>" +
      "<td>" +
      arrEngMost[r].missedVotesPercentage +
      "</td>" +
      "</tr>";
  }
  tableMost.innerHTML = table2;
}

// ↓ these are the tables on the loyalty pages ↓

var table5 = "";

const arrLoy = [];

if (
  document.title == "Senate Party Loyalty" ||
  document.title == "House Party Loyalty"
) {
  createLoyList();
}

function createLoyList() {
  for (r = 0; r < members.length; r++) {
    if (
      members[r].total_votes != null ||
      members[r].votes_with_party_pct !== "undefined"
    ) {
      arrLoy.push({
        numberPartyVotes: Math.round((members[r].votes_with_party_pct) / 100) * members[r].total_votes,
        name: members[r].first_name +
          " " +
          (members[r].middle_name || "") +
          (" " + members[r].last_name),
        partyVotesPercentage: members[r].votes_with_party_pct
      });
    }
  }
  // ↓ this sorts arrLoy into ascending order
  arrLoy.sort((a, b) =>
    a.partyVotesPercentage < b.partyVotesPercentage ? 1 : -1);
  // ↓ this seems to be the easiest and shortest way  to do that ↓
  // list.sort((a, b) => (a.color > b.color) ? 1 : -1)

  // statistics.numberPartyVotes = (Math.floor(statistics.numberPartyVotes * 100) / 100);

  var arrLoyLeast = [];
  for (var r = 0; r < arrLoy.length; r++) {
    if (arrLoyLeast.length < arrLoy.length * 0.1) {
      arrLoyLeast.push(arrLoy[r]);
    }
  }
  createLoyLeastTable(arrLoyLeast);

  arrLoy.sort((a, b) =>
    a.partyVotesPercentage > b.partyVotesPercentage ? 1 : -1
  );

  var arrLoyMost = [];
  for (var r = 0; r < arrLoy.length; r++) {
    if (arrLoyMost.length < arrLoy.length * 0.1) {
      arrLoyMost.push(arrLoy[r]);
    }
  }
  createLoyMostTable(arrLoyMost);
}

function createLoyLeastTable(arr) {
  var leastTable = document.getElementById("leastLoyal");
  for (var r = 0; r < arr.length; r++) {
    table5 +=
      "<tr>" +
      "<td>" +
      arr[r].name +
      "</td>" +
      "<td>" +
      arr[r].numberPartyVotes +
      "</td>" +
      "<td>" +
      arr[r].partyVotesPercentage + "%" +
      "</td>" +
      "</tr>";
  }
  leastTable.innerHTML = table5;
}

function createLoyMostTable(arrLoyMost) {
  var tableMost = document.getElementById("mostLoyal");
  var table4 = "";
  for (var r = 0; r < arrLoyMost.length; r++) {
    table4 +=
      "<tr>" +
      "<td>" +
      arrLoyMost[r].name +
      "</td>" +
      "<td>" +
      arrLoyMost[r].numberPartyVotes +
      "</td>" +
      "<td>" +
      arrLoyMost[r].partyVotesPercentage + "%" +
      "</td>" +
      "</tr>";
  }
  tableMost.innerHTML = table4;
}