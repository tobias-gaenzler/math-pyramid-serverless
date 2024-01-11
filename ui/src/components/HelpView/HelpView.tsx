import { Container } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function HelpView() {
  return (
    <Container
      sx={{
        height: "100%",
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h3>How to play Math Pyramid?</h3>
      {/* rules */}
      <div>
        <b>Rule 1</b>: the sum of the numbers in two adjacent blocks must equal
        the number in the block above the two adjacent blocks
      </div>
      <div>
        <b>Rule 2</b>: the pyramid is solved when all blocks are filled and{" "}
        <i>Rule 1</i> holds for all adjacent blocks
      </div>
      
      {/* images */}
      <img
        style={{ maxWidth: "25em", marginTop: "2em" }}
        src={"./help_start.jpg"}
        alt="Initial pyramid"
        title="Initial pyramid"
      />
      <div style={{ maxWidth: "25em", fontSize: "small" }}>Initial Pyramid</div>
      <ArrowDownwardIcon sx={{ fontSize: 80, marginTop: "0.3em", color: "grey" }}/>
      <img
        style={{ maxWidth: "25em", marginTop: "2em" }}
        src={"./help_finished.jpg"}
        alt="Solved pyramid"
      ></img>
      <div style={{ maxWidth: "25em", fontSize: "small" }}> Solved Pyramid</div>

      {/* links */}
      <h4 style={{ marginTop: "4em" }}>Links</h4>
      <a
        href="https://www.youtube.com/watch?v=oLcpiQYtwYg"
        rel="noreferrer"
        target="_blank"
      >
        Tutorial (english)
      </a>
      <a
        href="https://www.youtube.com/watch?v=PMCsU79CI30"
        rel="noreferrer"
        target="_blank"
      >
        Tutorial (german)
      </a>
    </Container>
  );
}

export default HelpView;
