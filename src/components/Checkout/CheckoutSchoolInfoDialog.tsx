"use client";

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  MobileStepper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Fragment, useContext, useRef, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { SchoolInfoContext } from "./CheckoutGrid";
import {
  SchoolGroup,
  SchoolMemberType,
  registerSchoolMember,
} from "@/lib/api/school";

type Props = {
  onClose: () => void;
  open: boolean;
};

export default function CheckoutSchoolInfoDialog({
  onClose: handleClose,
  open,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 2;
  const [groupId, setGroupId] = useState(-1);
  const [subjectId, setSubjectId] = useState(-1);
  const [schoolMember, setSchoolMember] = useState<SchoolMemberType>("student");
  const [requiredInfo, setRequiredInfo] = useState(false);
  const [otherComment, setOtherComment] = useState("");
  const [otherCommentError, setOtherCommentError] = useState(false);
  const loading = useRef(false);
  const schoolInfoContext = useContext(SchoolInfoContext);

  function handleClickSchoolRegistration() {
    registerSchoolMember({
      type: schoolMember,
      comment: otherComment,
      groupId,
      subjectId,
      schoolId,
    });
  }

  const handleChangeSchoolMember = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSchoolMember(
      (event.target as HTMLInputElement).value as SchoolMemberType
    );
  };

  const handleChangeSubject = (event: SelectChangeEvent) => {
    setSubjectId(parseInt(event.target.value as string));
    setRequiredInfo(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (schoolMember === "other") {
      if (!otherComment || /^\s*$/.test(otherComment)) {
        setRequiredInfo(false);
      }
    }
    if (schoolMember === "student" && !groupId) {
      setRequiredInfo(false);
    }
    if (schoolMember === "teacher" && !subjectId) {
      setRequiredInfo(false);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let stepperLabel = "";
  if (activeStep == 0) {
    stepperLabel = "¿Qué eres?";
  } else if (activeStep == 1) {
    switch (schoolMember) {
      case "student":
        stepperLabel = "¿En qué sección estás?";
        break;
      case "teacher":
        stepperLabel = "¿Qué materia enseñas?";
        break;
      case "other":
        stepperLabel = "Entonces coméntanos, ¿quién eres?";
        break;
    }
  }

  const schoolCategories = schoolInfoContext.technicalSubjects.map((sub) => {
    return (
      <Fragment key={sub.id}>
        <ListSubheader>{sub.name}</ListSubheader>
        {sub.technicalGroups.map((g) => (
          <MenuItem key={g.id}>{g.name}</MenuItem>
        ))}
      </Fragment>
    );
  });

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      fullScreen={fullScreen}
      // maxWidth={"xs"}
    >
      <DialogTitle>Cuéntanos sobre ti...</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          // color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseSharpIcon />
      </IconButton>
      <DialogContent dividers>
        <DialogContentText component={"div"}>
          Necesitamos saber quién eres en el CTP Santa Ana para poder buscarte y
          entregarte el pedido.
        </DialogContentText>
        {/* 
        --------------------------------------------------
            STEPPER
        --------------------------------------------------
        */}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 2,
            minHeight: { md: "300px" },
          }}
        >
          <Typography variant="h6">{stepperLabel}</Typography>
          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <FormControl required>
                <FormLabel id="school-member-type-radio-buttons-group-label">
                  Soy...
                </FormLabel>
                <RadioGroup
                  aria-labelledby="school-member-type-radio-buttons-group-label"
                  defaultValue="student"
                  name="school-member-type-radio-buttons-group"
                  color="secondary"
                  value={schoolMember}
                  onChange={handleChangeSchoolMember}
                >
                  <FormControlLabel
                    value="student"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "secondary.main",
                          },
                        }}
                      />
                    }
                    label="Estudiante"
                  />
                  <FormControlLabel
                    value="teacher"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "secondary.main",
                          },
                        }}
                      />
                    }
                    label="Docente"
                  />
                  <FormControlLabel
                    value="other"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "secondary.main",
                          },
                        }}
                      />
                    }
                    label="Otro"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {activeStep === 1 && schoolMember === "student" && (
              <>
                <Autocomplete
                  id="grouped-demo"
                  size="small"
                  options={schoolInfoContext.groups}
                  getOptionLabel={(option) => option.name}
                  groupBy={(option) => option.technicalSubject.name}
                  handleHomeEndKeys
                  noOptionsText="No hay opciones"
                  onChange={(event: any, newValue: SchoolGroup | null) => {
                    if (newValue) {
                      setGroupId(newValue.id);
                      setRequiredInfo(true);
                    } else {
                      setRequiredInfo(false);
                    }
                  }}
                  fullWidth
                  filterOptions={(options, state) => {
                    return options.filter((opt) =>
                      opt.name
                        .toLocaleLowerCase()
                        .trim()
                        .includes(state.inputValue.toLocaleLowerCase().trim())
                    );
                  }}
                  renderInput={(params) => (
                    <TextField color="secondary" label="Sección" {...params} />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    );
                  }}
                />
              </>
            )}
            {activeStep === 1 && schoolMember === "teacher" && (
              <>
                <FormControl required fullWidth size="small">
                  <InputLabel id="school-subject-input-select-label">
                    Materia
                  </InputLabel>
                  <Select
                    size="small"
                    color="secondary"
                    labelId="school-subject-input-select-label"
                    id="school-subject-simple-select"
                    value={subjectId.toString()}
                    label="Materia"
                    onChange={handleChangeSubject}
                    //   size="small"
                  >
                    <ListSubheader>Académicas</ListSubheader>
                    {schoolInfoContext.academicSubjects.map((sub) => {
                      return (
                        <MenuItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </MenuItem>
                      );
                    })}
                    <ListSubheader>Técnicas</ListSubheader>
                    {schoolInfoContext.technicalSubjects.map((sub) => {
                      return (
                        <MenuItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Obligatorio</FormHelperText>
                </FormControl>
              </>
            )}
            {activeStep === 1 && schoolMember === "other" && (
              <>
                <TextField
                  id="multiline-order-comment"
                  error={otherCommentError}
                  value={otherComment}
                  label="Comentario..."
                  onChange={(e) => {
                    const text = e.target.value;
                    setOtherComment(text);
                    if (!text || /^\s*$/.test(text)) {
                      // regex to check if empty mf
                      setOtherCommentError(true);
                      setRequiredInfo(false);
                    } else {
                      setOtherCommentError(false);
                      setRequiredInfo(true);
                    }
                  }}
                  fullWidth
                  multiline
                  rows={4}
                  color="secondary"
                  helperText="¿Dónde te podríamos encontrar dentro del CTP Santa Ana?"
                />
              </>
            )}
          </Box>
          {/* <Typography>Elected member type: {schoolMember}</Typography>
          {schoolMember === "other" && otherComment}
          {schoolMember === "teacher" && subjectId}
          {schoolMember === "student" && groupId} */}
        </Box>
      </DialogContent>
      <DialogActions>
        <MobileStepper
          sx={{ flexGrow: 1, bgcolor: "background.paper" }}
          LinearProgressProps={{ color: "secondary" }}
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep === maxSteps - 1 ? (
              <LoadingButton
                size="small"
                disableElevation
                color="secondary"
                endIcon={<CheckSharpIcon />}
                disabled={!requiredInfo}
                loading={loading.current}
                onClick={handleClickSchoolRegistration}
              >
                Listo
              </LoadingButton>
            ) : (
              <Button
                size="small"
                onClick={handleNext}
                disableElevation
                color="secondary"
              >
                Siguiente
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )
          }
          backButton={
            <Button
              disableElevation
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              color="secondary"
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Volver
            </Button>
          }
        />
      </DialogActions>
    </Dialog>
  );
}
