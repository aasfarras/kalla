import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import {
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { height } from "@mui/system";

// Atur path ke worker dari output build
pdfjs.GlobalWorkerOptions.workerSrc = "/src/assets/pdf.worker.min.js"; // Path relatif ke root dari direktori build

const Delivery = () => {
  const [open, setOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const pdfPath1 = "/src/assets/pdf/dummy.pdf"; // Path ke PDF yang ingin Anda tampilkan
  const pdfPath2 = "/src/assets/pdf/1.pdf"; // Path ke PDF yang ingin Anda tampilkan

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
        <Worker workerUrl="/src/assets/pdf.worker.min.js">
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
              marginBottom: isMobile ? "16px" : "0",
            }}
            onClick={() => handleClickOpen(pdfPath2)}
          >
            <SubCard
              title="Kontrak"
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
                width: "100%",
                overflow: "auto",
                cursor: "pointer",
              }}
            >
              <Viewer fileUrl={pdfPath2} />
            </SubCard>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              height: isMobile ? "100%" : "56%",
              width: isMobile ? "100%" : "32%",
              marginBottom: isMobile ? "16px" : "0",
            }}
            onClick={() => handleClickOpen(pdfPath1)}
          >
            <SubCard
              title="Asuransi"
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
              marginBottom: isMobile ? "16px" : "0",
            }}
            onClick={() => handleClickOpen(pdfPath2)}
          >
            <SubCard
              title="Leasing"
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
                width: "100%",
                overflow: "auto",
                cursor: "pointer",
              }}
            >
              <Viewer fileUrl={pdfPath2} />
            </SubCard>
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
