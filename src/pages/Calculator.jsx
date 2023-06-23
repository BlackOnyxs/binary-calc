import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Box,
  MenuItem,
  ListItemIcon,
  Button,
} from "@mui/material";
import { ClearOutlined, Add, Remove, ModeEdit } from "@mui/icons-material/";

import { operators } from "../data/operators";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.first) {
    errors.first = "Ingrese un valor";
  } else if (RegExp("(0|1)*2").test(values.first)) {
    errors.first = "Solo se aceptan valores 1 y 0";
  }
  if (!values.second) {
    errors.second = "Ingrese un valor";
  } else if (RegExp("(0|1)*2").test(values.second)) {
    errors.second = "Solo se aceptan valores 1 y 0";
  }
  return errors;
};

export function Calculator() {
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState(null);
  const formik = useFormik({
    initialValues: {
      first: "",
      second: "",
      operator: operators[0].value,
    },
    validate,
    onSubmit: ({ first, second, operator }) => {
      switch (operator) {
        case "sum":
          setResult((parseInt(first, 2) + parseInt(second, 2)).toString(2));
          break;
        case "minus":
          setResult((parseInt(first, 2) - parseInt(second, 2)).toString(2));
          break;
        case "multiply":
          setResult((parseInt(first, 2) * parseInt(second, 2)).toString(2));
          break;
        case "division":
          setResult((parseInt(first, 2) / parseInt(second, 2)).toString(2));
          break;

        default:
          break;
      }
    },
  });

  useEffect(() => {}, [result]);

  return (
    <>
      {result && <Typography variant="h5">Resultado: {result}</Typography>}
      <Box
        sx={{ mt: 2, mb: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="first"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          placeholder="Ingrese un valor binario"
          autoFocus
          helperText={
            formik.errors.first && touched && `${formik.errors.first}`
          }
          onChange={formik.handleChange}
          error={formik.errors.first && touched}
          value={formik.values.first}
          onBlur={() => setTouched(true)}
        />
        <TextField
          id="operator"
          name="operator"
          sx={{ mt: 2, mb: 1 }}
          fullWidth
          select
          label="Selecciones una operación."
          defaultValue={operators[0].value}
          onChange={ formik.handleChange }
        >
          {operators.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              <ListItemIcon>
                {value === "sum" ? (
                  <Add />
                ) : value === "minus" ? (
                  <Remove />
                ) : value === "multiply" ? (
                  <ClearOutlined />
                ) : (
                  <ModeEdit />
                )}
                <Typography sx={{ ml: 1 }}>{label}</Typography>
              </ListItemIcon>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="second"
          sx={{ mt: 2, mb: 1 }}
          fullWidth
          placeholder="Ingrese un valor binario"
          helperText={formik.errors.second && touched && formik.errors.second}
          error={formik.errors.first && touched}
          value={formik.values.second}
          onChange={formik.handleChange}
          onBlur={() => setTouched(true)}
        />

        <Box
          display="flex"
          justifyItems="center"
          justifyContent="space-between"
        >
          <Button
            fullWidth
            xs={{ mt: 2 }}
            onClick={() => {
              formik.resetForm();
              setResult(null);
            }}
          >
            Reset
          </Button>
          <Button
            fullWidth
            xs={{ mt: 2 }}
            onClick={formik.handleSubmit}
            disabled={!!formik.errors.first && !!formik.errors.second}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </>
  );
}
