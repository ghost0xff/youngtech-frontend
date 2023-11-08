"use client";

import { Order } from "@/lib/api/order";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Switch,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useState } from "react";
import CheckoutDeliveryApologyDialog from "./CheckoutDeliveryApologyDialog";
import CheckoutSchoolInfoDialog from "./CheckoutSchoolInfoDialog";
import WarningAmberSharpIcon from "@mui/icons-material/WarningAmberSharp";
import { schoolMetadata } from "@/lib/api/school";
import { SchoolInfoContext } from "./CheckoutGrid";

// type SchoolMember = "student" | "teacher" | "admin" | "other";
type Props = {
  checkoutData: Order;
};

export default function CheckoutShippingInfo({ checkoutData }: Props) {
  const [availableOnDelivery, setAvailableOnDelivery] = useState(true);
  const [openApologyDialog, setOpenApologyDialog] = useState(false);
  const [openSchoolInfoDialog, setOpenSchoolInfoDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const schoolInfoContext = useContext(SchoolInfoContext);
  const isSchoolMember = schoolInfoContext.isSchoolMember;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  function handleCloseSchoolInfoDialog() {
    setOpenSchoolInfoDialog(false);
  }

  function handleCloseApologyDialog() {
    setOpenApologyDialog(false);
  }

  const fromDateTime = new Date(checkoutData.deliveryFrom).toLocaleString();
  const toDateTime = new Date(checkoutData.deliveryTo).toLocaleString();

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Información de Envío</Typography>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {/* 
            --------------------------------------------------
                PAYMENT METHOD
            --------------------------------------------------
            */}
              <Step key={"step-0"}>
                <StepLabel
                  optional={
                    activeStep !== 0 && (
                      <Typography color="success.main" variant="caption">
                        Efectivo - CRC ₡
                      </Typography>
                    )
                  }
                >
                  Selecciona un método de pago{" "}
                </StepLabel>
                <StepContent>
                  <Typography>
                    Por el momento YoungTech solo acepta pago en efectivo, los
                    cuales deben hacerse a la hora de entrega del pedido.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continuar
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>

              {/* 
            --------------------------------------------------
                DELIVERY DATE 
            --------------------------------------------------
            */}
              <Step key={"step-1"}>
                <StepLabel
                  optional={
                    activeStep !== 1 && (
                      <Fragment>
                        <Typography variant="caption">
                          {fromDateTime} {" - "}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {toDateTime}
                        </Typography>
                      </Fragment>
                    )
                  }
                >
                  Confirma la fecha de entrega
                </StepLabel>

                <StepContent>
                  <Stack spacing={1}>
                    <Box>
                      <Typography
                        variant="caption"
                        //   color="text.secondary"
                        sx={{ textDecoration: "underline" }}
                      >
                        Fechas de entrega:
                      </Typography>
                      <Typography variant="body2">
                        Desde: {fromDateTime}
                      </Typography>
                      <Typography variant="body2">
                        Hasta: {toDateTime}
                      </Typography>
                    </Box>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            // de
                            color="secondary"
                            onChange={() =>
                              setAvailableOnDelivery((c) => {
                                //  if already know that they arent available
                                if (availableOnDelivery) {
                                  setOpenApologyDialog(true);
                                }
                                return !c;
                              })
                            }
                          />
                        }
                        label={"Estas fechas no puedo..."}
                      />
                    </FormGroup>
                  </Stack>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!availableOnDelivery}
                      >
                        Continuar
                      </Button>
                      <Button
                        size="small"
                        disableElevation
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Volver
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>

              {/* 
            --------------------------------------------------
                DELIVERY ADDRESS
            --------------------------------------------------
            */}
              <Step key={"step-2"}>
                <StepLabel
                  optional={
                    <Typography variant="caption">
                      Haremos uso de ella para ubicarte
                    </Typography>
                  }
                >
                  {" "}
                  Confirma tu Información
                </StepLabel>
                <StepContent>
                  <Typography variant="body2">
                    Solo hacemos entregas dentro del CTP Santa Ana. Te
                    buscaremos y te entregaremos tu pedido en cualquier parte
                    del colegio que estes.
                  </Typography>
                  {!isSchoolMember && (
                    <>
                      {/* <Alert severity="warning" variant="filled">
                        ¿Eres estudiante o personal?
                      </Alert> */}
                      <Button
                        fullWidth
                        variant="contained"
                        color="warning"
                        disableElevation
                        sx={{ textTransform: "none", my: 1 }}
                        startIcon={<WarningAmberSharpIcon />}
                        onClick={() => setOpenSchoolInfoDialog(true)}
                      >
                        ¿Eres estudiante o personal?
                      </Button>
                    </>
                  )}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!isSchoolMember}
                      >
                        Terminar
                      </Button>
                      <Button
                        size="small"
                        disableElevation
                        //   disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Volver
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>

            {/* 
              --------------------------------------------------
                  ORDER BUTTON 
              --------------------------------------------------
            */}
            {activeStep === 3 && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography textAlign="center">
                  Ya está listo - Ordena ahora!
                </Typography>
                <Button
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  disableElevation
                  onClick={handleReset}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Ordenar
                </Button>
              </Paper>
            )}
          </Box>
          {/* <Divider sx={{ mt: 2 }} /> */}
          {/* <Typography>Fecha</Typography> */}
        </CardContent>
      </Card>

      {/* 
          --------------------------------------------------
              SORRY (the dialog)
          --------------------------------------------------
      */}
      <CheckoutDeliveryApologyDialog
        open={openApologyDialog}
        onClose={handleCloseApologyDialog}
      />
      <CheckoutSchoolInfoDialog
        open={openSchoolInfoDialog}
        onClose={handleCloseSchoolInfoDialog}
      />
    </>
  );
}
