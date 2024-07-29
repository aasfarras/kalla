import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import {
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

const Delivery = () => {
  const [open, setOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const pdfPath1 = "/pdf/dummy.pdf";
  const pdfPath2 = "/pdf/1.pdf";

  const handleClickOpen = (pdf) => {
    setSelectedPdf(pdf);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPdf(null);
  };

  return (
    <MainCard title="Dokumen" style={{ overflow: "auto" }}>
      <Grid
        container
        direction={isMobile ? "column" : "row"}
        spacing={2}
        sx={{ height: "100vh" }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              height: isMobile ? "auto" : "56%",
              width: isMobile ? "100%" : "32%",
              marginBottom: isMobile ? "16px" : "0",
            }}
            onClick={() => handleClickOpen(pdfPath1)}
          >
            <SubCard
              title="BTSB"
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
                width: "100%",
                overflow: "auto",
                cursor: "pointer",
              }}
            >
              <Viewer fileUrl={pdfPath1} />
            </SubCard>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              height: isMobile ? "auto" : "56%",
              width: isMobile ? "100%" : "32%",
              marginTop: { xs: "30px", md: "0" },
              display: "flex",
              alignItems: { xs: "left", md: "center" },
              justifyContent: { xs: "left", md: "center" },
            }}
          >
            <div>
              <Typography variant="h3" sx={{ mb: 1 }}>
                BPKB
              </Typography>
              <Typography variant="body">Status : Ready!</Typography>
            </div>
          </Grid>
        </Worker>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogContent>
          {selectedPdf && (
            <div style={{ height: "80vh" }}>
              <Viewer fileUrl={selectedPdf} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default Delivery;

// const VehicleDoc = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedPdf, setSelectedPdf] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

//   const pdfPath1 = "/src/assets/pdf/dummy.pdf";

//   const handleClickOpen = (pdf) => {
//     setSelectedPdf(pdf);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedPdf(null);
//   };

//   return (
//     <MainCard style={{ overflow: "auto" }}>
//       <Grid
//         container
//         direction={isMobile ? "column" : "row"}
//         spacing={2}
//         sx={{ height: "100vh" }}
//       >
//         <Worker workerUrl="/src/assets/pdf.worker.min.js">
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             sx={{
//               height: isMobile ? "auto" : "56%",
//               width: isMobile ? "100%" : "32%",
//               marginBottom: isMobile ? "16px" : "0",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => handleClickOpen(pdfPath1)}
//           >
//             <SubCard
//               title="STNK"
//               sx={{
//                 border: "1px solid rgba(0, 0, 0, 0.3)",
//                 height: "100%",
//                 width: "100%",
//                 overflow: "auto",
//                 cursor: "pointer",
//               }}
//             >
//               <Viewer fileUrl={pdfPath1} />
//             </SubCard>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             sx={{
//               height: isMobile ? "auto" : "56%",
//               width: isMobile ? "100%" : "32%",
//               marginTop: { xs: "30px", md: "0" },
//               display: "flex",
//               alignItems: { xs: "left", md: "center" },
//               justifyContent: { xs: "left", md: "center" },
//             }}
//           >
//             <div>
//               <Typography variant="h3" sx={{ mb: 1 }}>
//                 BPKB
//               </Typography>
//               <Typography variant="body">Status : Ready!</Typography>
//             </div>
//           </Grid>
//         </Worker>
//       </Grid>
//       <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
//         <DialogContent>
//           {selectedPdf && (
//             <div style={{ height: "80vh" }}>
//               <Viewer fileUrl={selectedPdf} />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </MainCard>
//   );
// };

// export default VehicleDoc;
