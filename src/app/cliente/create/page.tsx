"use client";

import { FC, useState } from "react";
import axios from "axios";
import { TextField, Button, InputLabel, Select, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface ClienteForm {
  nome_cli: string;
  cpf_cli: string;
  telefone_cli: string;
}