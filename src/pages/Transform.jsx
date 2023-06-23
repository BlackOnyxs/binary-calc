import { useEffect, useState } from "react";
import { Typography, TextField, Box, Button, MenuItem } from "@mui/material";

import { useFormik } from "formik";
import { types } from "../data/operators";

const validate = (values) => {
  const errors = {};
  if ( values.type === 'decimal') {

    if (!values.decimal) {
      errors.decimal = "Ingrese un valor";
    } else if (!RegExp("^[0-9]+([,][0-9]+)?$").test(values.decimal)) {
      errors.decimal = "Solo se aceptan valores decimales";
    }
  } else {
    
    if (!values.binary) {
      errors.binary = "Ingrese un valor";
    } else if (RegExp("(0|1)*2").test(values.binary)) {
      errors.binary = "Solo se aceptan valores 1 y 0";
    }
  }
  return errors;
};

export const Transform = () => {
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState(null);
  const formik = useFormik({
    initialValues: {
      binary: "",
      decimal: "",
      type: types[0].value,
    },
    validateOnBlur: false,
    validate,
    onSubmit: ({ binary, decimal, type }) => {
      console.log({ binary, decimal, type })
      type === 'decimal'
        ? setResult((decimal >>> 0).toString(2))
        : setResult(parseInt(binary, 2));
    },
  });

  useEffect(() => {}, [result, formik.values.type]);
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
          id="type"
          name="type"
          sx={{ mt: 2, mb: 1 }}
          fullWidth
          select
          label="Convertir a"
          defaultValue={formik.values.type}
          onChange={formik.handleChange}
        >
          {types.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              <Typography sx={{ ml: 1 }}>{label}</Typography>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="binary"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          placeholder="Ingrese un valor binario"
          autoFocus
          disabled={ formik.values.type === 'decimal'}
          helperText={
            formik.values.type === 'binary' &&
            formik.errors.binary && touched && `${formik.errors.binary}`
          }
          onChange={formik.handleChange}
          error={formik.errors.binary && touched}
          value={formik.values.binary}
          onBlur={() => setTouched(true)}
        />

        <TextField
          id="decimal"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          placeholder="Ingrese un valor décimal"
          autoFocus
          disabled={ formik.values.type === 'binary'}
          helperText={
            formik.values.type === 'decimal' &&
            formik.errors.decimal && touched && `${formik.errors.decimal}`
          }
          onChange={formik.handleChange}
          error={formik.errors.decimal && touched}
          value={formik.values.decimal}
          onBlur={() => setTouched(true)}
        />
      </Box>
      <Box display="flex" justifyItems="center" justifyContent="space-between">
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
          onClick={ () => {
            console.log('sip')
            formik.handleSubmit();
          }}
          disabled={!!formik.errors.binary && !!formik.errors.decimal}
        >
          Enviar
        </Button>
      </Box>
    </>
  );
};
