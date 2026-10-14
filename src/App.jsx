import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  LinearProgress,
  Paper,
  Radio,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  ArrowForward,
  Bolt,
  CheckCircleOutlined,
  Error,
  HomeOutlined,
  Replay,
  Wifi,
} from "@mui/icons-material";

const mtnTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFCC00", contrastText: "#000000" },
    background: { default: "#0A0A0A", paper: "#141414" },
    text: { primary: "#FFFFFF", secondary: "#B0B0B0" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: "none", fontWeight: 700 },
  },
});

const rewards = [
  { id: "data", title: "40GB Free Data", description: "High-speed 4G/5G data bundle valid for 30 days.", icon: <Wifi /> },
  { id: "airtime", title: "₦10,000 Airtime", description: "Direct voice and SMS credit loaded to your line.", icon: <Bolt /> },
];

export default function MtnPromoApp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [selectedReward, setSelectedReward] = useState("data");
  
  // Processing / Loading states
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const [outcome, setOutcome] = useState("success"); // "success" or "failed"
  const [error, setError] = useState("");

  // Countdown and outcome simulation handler
  useEffect(() => {
    if (!loadingOpen) return undefined;

    if (seconds === 0) {
      const timeout = window.setTimeout(() => {
        setLoadingOpen(false);
        // Randomly determine success or failure for demonstration (e.g. 80% success rate)
        const isSuccess = Math.random() < 0.8;
        setOutcome(isSuccess ? "success" : "failed");
        setStep(4); // Result Page
      }, 400);
      return () => window.clearTimeout(timeout);
    }

    const timer = window.setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [loadingOpen, seconds]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields before continuing.");
      return;
    }
    setStep(3);
  };

  const handleProcessActivation = () => {
    setSeconds(3);
    setLoadingOpen(true);
  };

  const resetFlow = () => {
    setStep(1);
    setFormData({ name: "", email: "", phone: "" });
    setSelectedReward("data");
    setLoadingOpen(false);
    setSeconds(3);
    setError("");
  };

  const progress = step === 4 ? 100 : ((step - 1) / 3) * 100;

  return (
    <ThemeProvider theme={mtnTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 4, md: 8 }, px: 2 }}>
        <Container maxWidth="sm">
          <Stack spacing={3}>
            {/* Header Branding */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                MTN
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight={800} letterSpacing={0.5}>
                  MTN NETWORK PROVIDER
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Loyalty Rewards Portal
                </Typography>
              </Box>
            </Stack>

            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 6, borderRadius: 5, bgcolor: "#222222" }}
            />

            {error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* PAGE 1: INTRODUCTION */}
            {step === 1 && (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 5 },
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  borderRadius: 4,
                  background: "radial-gradient(circle at 90% 10%, rgba(255,204,0,.12), transparent 40%), #141414",
                }}
              >
                <Stack spacing={3} alignItems="flex-start">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: "rgba(255, 204, 0, 0.1)",
                      color: "primary.main",
                      display: "inline-flex",
                    }}
                  >
                    <Wifi sx={{ fontSize: 36 }} />
                  </Box>
                  <Typography variant="h4" fontWeight={900} sx={{ lineHeight: 1.2 }}>
                    Claim Your 40GB Free Data & Airtime Reward
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    MTN is celebrating our loyal subscribers by giving out 40GB of free high-speed mobile data and voice airtime credits. Complete a quick verification process to claim your reward instantly.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => setStep(2)}
                    sx={{ py: 1.5, fontSize: "1rem", fontWeight: 700 }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Paper>
            )}

            {/* PAGE 2: USER INFORMATION */}
            {step === 2 && (
              <Paper
                component="form"
                onSubmit={handleStep2Submit}
                elevation={0}
                sx={{ p: { xs: 3, sm: 5 }, border: "1px solid rgba(255, 204, 0, 0.2)", borderRadius: 4 }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h5" fontWeight={850} gutterBottom>
                      Subscriber Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter your active details to register your line for the reward allocation.
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="MTN Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="0803..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />

                  <Stack direction="row" spacing={2} pt={1}>
                    <Button variant="outlined" color="inherit" onClick={() => setStep(1)} sx={{ flex: 1 }}>
                      Back
                    </Button>
                    <Button type="submit" variant="contained" size="large" sx={{ flex: 2, fontWeight: 700 }}>
                      Continue
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            )}

            {/* PAGE 3: REWARD SELECTION */}
            {step === 3 && (
              <Paper
                elevation={0}
                sx={{ p: { xs: 3, sm: 5 }, border: "1px solid rgba(255, 204, 0, 0.2)", borderRadius: 4 }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h5" fontWeight={850} gutterBottom>
                      Select Your Reward
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Choose your preferred promotional package for <strong>{formData.phone}</strong>.
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {rewards.map((reward) => (
                      <Card
                        key={reward.id}
                        variant="outlined"
                        sx={{
                          borderColor: selectedReward === reward.id ? "primary.main" : "#303030",
                          bgcolor: selectedReward === reward.id ? "rgba(255,204,0,.05)" : "transparent",
                          borderRadius: 3,
                        }}
                      >
                        <CardActionArea onClick={() => setSelectedReward(reward.id)}>
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Radio checked={selectedReward === reward.id} color="primary" />
                              <Box sx={{ color: "primary.main", display: "flex" }}>{reward.icon}</Box>
                              <Box>
                                <Typography fontWeight={700}>{reward.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {reward.description}
                                </Typography>
                              </Box>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={2} pt={1}>
                    <Button variant="outlined" color="inherit" onClick={() => setStep(2)} sx={{ flex: 1 }}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Bolt />}
                      onClick={handleProcessActivation}
                      disabled={!selectedReward}
                      sx={{ flex: 2, fontWeight: 700 }}
                    >
                      Activate Reward
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            )}

            {/* PAGE 4: RESULT SCREEN (SUCCESS OR FAILED) */}
            {step === 4 && (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 6 },
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                {outcome === "success" ? (
                  <Stack spacing={3} alignItems="center">
                    <CheckCircleOutlined sx={{ fontSize: 72, color: "#4caf50" }} />
                    <Typography variant="h4" fontWeight={850}>
                      Successfully Activated!
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
                      Your reward ({selectedReward === "data" ? "40GB Data" : "₦10,000 Airtime"}) has been successfully processed and queued for delivery to <strong>{formData.phone}</strong>. Share to 10 people to unlock additional rewards and benefits.
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 2, width: "100%" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<HomeOutlined />}
                        onClick={resetFlow}
                        sx={{ fontWeight: 700 }}
                      >
                        Back to Main Page
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="inherit"
                        size="large"
                        startIcon={<Replay />}
                        onClick={resetFlow}
                      >
                        Claim Another
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
  <Stack spacing={3} alignItems="center">
    <Error sx={{ fontSize: 72, color: "#f44336" }} />
    <Typography variant="h4" fontWeight={850}>
      Activation Failed
    </Typography>
    <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
      We could not verify network line eligibility for <strong>{formData.phone}</strong> at this moment. Share to 10 people to unlock additional rewards and benefits.
    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 2, width: "100%" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<Replay />}
                        onClick={() => setStep(3)}
                        sx={{ fontWeight: 700 }}
                      >
                        Try Again
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="inherit"
                        size="large"
                        startIcon={<HomeOutlined />}
                        onClick={resetFlow}
                      >
                        Start Over
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Paper>
            )}
          </Stack>
        </Container>

        {/* LOADING / PROCESSING MODAL */}
        <Dialog open={loadingOpen} fullWidth maxWidth="xs" onClose={() => {}}>
          <DialogContent sx={{ p: 4, bgcolor: "background.paper", borderRadius: 4 }}>
            <Stack spacing={3} alignItems="center" textAlign="center">
              <CircularProgress color="primary" size={56} thickness={4} />
              <Box>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Processing Request...
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Verifying subscriber line and dispatching reward allocation ({seconds}s)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((3 - seconds) / 3) * 100}
                sx={{ width: "100%", height: 6, borderRadius: 5 }}
              />
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}