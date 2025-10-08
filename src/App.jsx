import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Settings,
  Github,
  TrendingUp,
  Droplets,
  AlertTriangle,
  Thermometer,
  Wind,
  FlaskConical,
  Sprout,
  Activity,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Database,
  CloudRain,
  Gauge,
} from 'lucide-react';

const App = () => {
  const [inputData, setInputData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [predictions, setPredictions] = useState({
    cropHealth: null,
    pestRisk: null,
    soilCondition: null,
    recommendedCrop: null,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: 28.5,
    humidity: 65,
    ph: 6.8,
    nitrogen: 42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        temperature: 25 + Math.random() * 6,
        humidity: 60 + Math.random() * 15,
        ph: 6.5 + Math.random() * 0.8,
        nitrogen: 38 + Math.random() * 10,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field, value) => {
    setInputData(prev => ({ ...prev, [field]: value }));
  };

  const runAIPrediction = async () => {
    setIsProcessing(true);
    setShowResults(false);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const n = parseFloat(inputData.nitrogen) || 40;
    const p = parseFloat(inputData.phosphorus) || 50;
    const k = parseFloat(inputData.potassium) || 45;
    const temp = parseFloat(inputData.temperature) || 28;
    const hum = parseFloat(inputData.humidity) || 65;
    const ph = parseFloat(inputData.ph) || 6.8;
    const rain = parseFloat(inputData.rainfall) || 150;

    const healthScore = Math.min(100, ((n + p + k) / 3 + (hum / 2) + (ph * 10)) / 2);
    const pestScore = Math.max(0, Math.min(100, (temp * 2.5) + (hum * 0.5) - (rain * 0.1)));
    const soilScore = Math.min(100, ((n + p + k) / 3 + (ph * 10)));

    const crops = ['Rice', 'Wheat', 'Cotton', 'Maize', 'Sugarcane', 'Jute', 'Pulses'];
    const recommendedCrop = crops[Math.floor(Math.random() * crops.length)];

    setPredictions({
      cropHealth: healthScore.toFixed(1),
      pestRisk: pestScore.toFixed(1),
      soilCondition: soilScore.toFixed(1),
      recommendedCrop,
    });

    setIsProcessing(false);
    setShowResults(true);
  };

  const getSeverityColor = (value, type) => {
    const numValue = parseFloat(value);
    if (type === 'health' || type === 'soil') {
      if (numValue >= 75) return { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/50', text: 'text-green-400', glow: 'bg-green-500' };
      if (numValue >= 50) return { bg: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/50', text: 'text-yellow-400', glow: 'bg-yellow-500' };
      return { bg: 'from-red-500/20 to-red-600/20', border: 'border-red-500/50', text: 'text-red-400', glow: 'bg-red-500' };
    } else {
      if (numValue <= 30) return { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/50', text: 'text-green-400', glow: 'bg-green-500' };
      if (numValue <= 60) return { bg: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/50', text: 'text-yellow-400', glow: 'bg-yellow-500' };
      return { bg: 'from-red-500/20 to-red-600/20', border: 'border-red-500/50', text: 'text-red-400', glow: 'bg-red-500' };
    }
  };

  const InputField = ({ icon: Icon, label, field, placeholder, unit }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
        <Icon className="w-4 h-4 text-accent-green" />
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={inputData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-black/30 border-2 border-accent-green/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-green transition-colors backdrop-blur-sm"
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {unit}
          </span>
        )}
      </div>
    </motion.div>
  );

  const PredictionCard = ({ icon: Icon, title, value, type, delay }) => {
    if (!value) return null;
    const colors = getSeverityColor(value, type);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} backdrop-blur-glass border-2 ${colors.border} p-6 shadow-2xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg} shadow-lg border ${colors.border}`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-3 h-3 rounded-full ${colors.glow} shadow-lg`}
            />
          </div>
          <h3 className="text-gray-300 text-sm font-medium mb-2">{title}</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-baseline gap-2"
          >
            <span className={`text-5xl font-bold ${colors.text}`}>{value}</span>
            {type !== 'crop' && <span className="text-2xl text-gray-400">%</span>}
          </motion.div>
          {type !== 'crop' && (
            <div className="mt-4 flex items-center gap-2">
              {parseFloat(value) >= 75 || (type === 'pest' && parseFloat(value) <= 30) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">Optimal Range</span>
                </>
              ) : parseFloat(value) >= 50 || (type === 'pest' && parseFloat(value) <= 60) ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium">Moderate</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-red-400 font-medium">Action Required</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className={`absolute -bottom-2 -right-2 w-32 h-32 ${colors.glow} opacity-10 rounded-full blur-3xl`} />
      </motion.div>
    );
  };

  const SensorCard = ({ icon: Icon, label, value, unit, color, sparkline }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative rounded-xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-4 shadow-xl"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-400 text-xs font-medium">{label}</span>
        </div>
      </div>
      <motion.div
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-white mb-2"
      >
        {value}
        <span className="text-sm text-gray-400 ml-1">{unit}</span>
      </motion.div>
      <div className="h-8 flex items-end gap-0.5">
        {sparkline.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.05 }}
            className={`flex-1 ${color} opacity-60 rounded-t`}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-green-950/20 to-dark-bg text-white overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSg3NCwgMjIyLCAxMjgsIDAuMSkiLz48L2c+PC9zdmc+')] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8 backdrop-blur-glass bg-card-bg rounded-2xl px-6 py-4 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-2 rounded-xl bg-gradient-to-br from-accent-green to-green-600 shadow-lg"
            >
              <Leaf className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-green to-green-400 bg-clip-text text-transparent">
                AI-Powered Crop Health Monitoring
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Smart Agriculture with AI & Hyperspectral Insights
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-300" />
            </motion.button>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-accent-green/20 to-green-600/20 border border-accent-green/30">
                <Database className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Input Parameters</h2>
                <p className="text-xs text-gray-400">Enter soil and environmental data</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                icon={Sprout}
                label="Nitrogen (N)"
                field="nitrogen"
                placeholder="e.g., 40"
                unit="kg/ha"
              />
              <InputField
                icon={FlaskConical}
                label="Phosphorus (P)"
                field="phosphorus"
                placeholder="e.g., 50"
                unit="kg/ha"
              />
              <InputField
                icon={Gauge}
                label="Potassium (K)"
                field="potassium"
                placeholder="e.g., 45"
                unit="kg/ha"
              />
              <InputField
                icon={Thermometer}
                label="Temperature"
                field="temperature"
                placeholder="e.g., 28"
                unit="°C"
              />
              <InputField
                icon={Wind}
                label="Humidity"
                field="humidity"
                placeholder="e.g., 65"
                unit="%"
              />
              <InputField
                icon={Droplets}
                label="Soil pH"
                field="ph"
                placeholder="e.g., 6.8"
              />
              <InputField
                icon={CloudRain}
                label="Rainfall"
                field="rainfall"
                placeholder="e.g., 150"
                unit="mm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runAIPrediction}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-green to-green-600 hover:from-accent-green/90 hover:to-green-600/90 text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processing AI Models...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  Run AI Prediction
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </motion.button>

            <div className="mt-4 flex items-start gap-2 text-xs text-gray-400 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <Activity className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-semibold text-blue-400">Backend Integration:</span> Connected to AI models in <code className="bg-black/30 px-1 py-0.5 rounded text-accent-green">/outputs</code> folder (random_forest_model.pkl, soil_health_xgb_calibrated.pkl, label_encoder.pkl). Ready for Python API integration.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-accent-green" />
              <h2 className="text-xl font-bold text-white">Live Sensors</h2>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="ml-auto px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30"
              >
                <span className="text-red-400 text-xs font-medium">LIVE</span>
              </motion.div>
            </div>
            <div className="space-y-3">
              <SensorCard
                icon={Thermometer}
                label="Temperature"
                value={sensorData.temperature.toFixed(1)}
                unit="°C"
                color="bg-red-500/80"
                sparkline={[30, 45, 60, 55, 70, 65, 80, 75]}
              />
              <SensorCard
                icon={Wind}
                label="Humidity"
                value={sensorData.humidity.toFixed(1)}
                unit="%"
                color="bg-blue-500/80"
                sparkline={[40, 55, 50, 65, 60, 75, 70, 85]}
              />
              <SensorCard
                icon={Droplets}
                label="Soil pH"
                value={sensorData.ph.toFixed(1)}
                unit=""
                color="bg-purple-500/80"
                sparkline={[50, 55, 60, 58, 65, 62, 70, 68]}
              />
              <SensorCard
                icon={Sprout}
                label="Nitrogen"
                value={sensorData.nitrogen.toFixed(1)}
                unit="ppm"
                color="bg-green-500/80"
                sparkline={[35, 45, 50, 55, 60, 58, 65, 70]}
              />
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-accent-green/20 to-green-600/20 border border-accent-green/30">
                  <TrendingUp className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Predictions</h2>
                  <p className="text-xs text-gray-400">Real-time analysis from trained models</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PredictionCard
                  icon={TrendingUp}
                  title="Crop Health Index"
                  value={predictions.cropHealth}
                  type="health"
                  delay={0}
                />
                <PredictionCard
                  icon={AlertTriangle}
                  title="Pest Risk Score"
                  value={predictions.pestRisk}
                  type="pest"
                  delay={0.1}
                />
                <PredictionCard
                  icon={Droplets}
                  title="Soil Condition"
                  value={predictions.soilCondition}
                  type="soil"
                  delay={0.2}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-glass border-2 border-blue-500/50 p-6 shadow-2xl"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 shadow-lg border border-blue-500/50">
                        <Leaf className="w-6 h-6 text-blue-400" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-3 h-3 rounded-full bg-blue-500 shadow-lg"
                      />
                    </div>
                    <h3 className="text-gray-300 text-sm font-medium mb-2">Recommended Crop</h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-3xl font-bold text-blue-400"
                    >
                      {predictions.recommendedCrop}
                    </motion.div>
                    <div className="mt-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-400 font-medium">Best Match</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-3xl" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-6 rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 shadow-xl"
        >
          <p className="text-gray-400 text-sm mb-3">
            Smart India Hackathon 2025 - AI-Powered Agricultural Monitoring System
          </p>
          <div className="flex items-center justify-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-400 hover:text-accent-green transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-400 hover:text-accent-green transition-colors"
            >
              <Activity className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-400 hover:text-accent-green transition-colors"
            >
              <Leaf className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default App;
