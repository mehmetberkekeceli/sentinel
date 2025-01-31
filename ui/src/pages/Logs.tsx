import { useState, useEffect } from "react";
import { getAllLogs } from "../services/logService";
import { Log } from "../types/Log";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  TablePagination,
} from "@mui/material";

const LogsPage = () => {
  const [allLogs, setAllLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [filterLevel, setFilterLevel] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(7);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getAllLogs();
      setAllLogs(data || []);
      setFilteredLogs(data || []);
    } catch (error) {
      console.error("Logları çekerken hata oluştu:", error);
    }
  };

  const handleFilterChange = (level: string) => {
    setFilterLevel(level);
    setPage(0);
    if (level === "") {
      setFilteredLogs(allLogs);
    } else {
      setFilteredLogs(allLogs.filter((log) => log.level === level));
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
        color: "#FFF",
      }}
    >
      <Sidebar />

      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "0px 0px 15px rgba(0, 255, 255, 0.9)",
          }}
        >
          📜 Log Kayıtları
        </Typography>

        <TextField
          select
          label="Log Seviyesine Göre Filtrele"
          value={filterLevel}
          onChange={(e) => handleFilterChange(e.target.value)}
          sx={{
            marginBottom: "20px",
            backgroundColor: "#232323",
            color: "#FFF",
            "& .MuiInputBase-root": { color: "#FFF" },
            "& .MuiInputLabel-root": { color: "#B0B0B0" },
            width: "250px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
          }}
        >
          <MenuItem value="">Tümü</MenuItem>
          <MenuItem value="INFO">INFO</MenuItem>
          <MenuItem value="WARNING">WARNING</MenuItem>
          <MenuItem value="ERROR">ERROR</MenuItem>
        </TextField>

        <TableContainer
          component={Paper}
          sx={{
            background: "#161616",
            borderRadius: "10px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 120px)",
            boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ background: "#1A1A1A" }}>
                {[
                  "id",
                  "timestamp",
                  "level",
                  "message",
                  "source",
                  "userId",
                ].map((field) => (
                  <TableCell
                    key={field}
                    sx={{
                      color: "#00FFFF",
                      fontWeight: "bold",
                      background: "#101010",
                      textTransform: "uppercase",
                      "&:hover": {
                        textShadow: "0px 0px 8px rgba(0, 255, 255, 0.7)",
                      },
                    }}
                  >
                    {field.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((log, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "rgba(0, 255, 255, 0.2)",
                        boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.4)",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#FFF" }}>
                      {log?.id || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#FFF" }}>
                      {log?.timestamp
                        ? new Date(log.timestamp).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        color:
                          log?.level === "ERROR"
                            ? "#FF004D"
                            : log?.level === "WARNING"
                            ? "#FFAD00"
                            : "#00FF7F",
                        fontWeight: "bold",
                      }}
                    >
                      {log?.level || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#FFF" }}>
                      {log?.message || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#FFF" }}>
                      {log?.source || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#FFF" }}>
                      {log?.userId || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[6]}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          sx={{
            color: "#00FFFF",
            "& .MuiTablePagination-toolbar": {
              backgroundColor: "#161616",
              borderRadius: "10px",
            },
            "& .MuiTablePagination-actions button": {
              color: "#00FFFF",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LogsPage;
