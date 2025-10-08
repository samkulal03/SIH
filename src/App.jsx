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
  ZoomIn,
  ZoomOut,
  Layers,
  Download,
  ChevronDown,
  ChevronUp,
  Activity,
  MapPin,
} from 'lucide-react';

const App = () => {
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [sensorData, setSensorData] = useState({
    temperature: 28,
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

  const MetricCard = ({ icon: Icon, title, value, unit, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-6 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-2 h-2 rounded-full ${color.split(' ')[0].replace('from-', 'bg-')} shadow-lg`}
          />
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-baseline gap-2"
        >
          <span className="text-4xl font-bold text-white">{value}</span>
          <span className="text-xl text-gray-400">{unit}</span>
        </motion.div>
      </div>
      <div className={`absolute -bottom-2 -right-2 w-32 h-32 ${color.split(' ')[0].replace('from-', 'bg-')} opacity-10 rounded-full blur-3xl`} />
    </motion.div>
  );

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

  const InsightCard = ({ title, status, severity, description, recommendation, id }) => {
    const isExpanded = expandedInsight === id;
    const severityColors = {
      low: 'from-green-500/20 to-green-600/20 border-green-500/30',
      medium: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      high: 'from-red-500/20 to-red-600/20 border-red-500/30',
    };

    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`rounded-xl bg-gradient-to-br ${severityColors[severity]} backdrop-blur-glass border p-4 shadow-lg cursor-pointer`}
        onClick={() => setExpandedInsight(isExpanded ? null : id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-accent-green" />
              <h4 className="text-white font-semibold text-sm">{title}</h4>
            </div>
            <p className="text-gray-300 text-xs mb-2">{status}</p>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </motion.div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10 mt-3">
                <p className="text-gray-300 text-xs mb-3">{description}</p>
                <div className="bg-black/20 rounded-lg p-3 mb-3">
                  <p className="text-accent-green text-xs font-medium mb-1">Recommendation:</p>
                  <p className="text-gray-300 text-xs">{recommendation}</p>
                </div>
                <button className="w-full py-2 rounded-lg bg-accent-green/20 hover:bg-accent-green/30 text-accent-green text-xs font-semibold transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            icon={TrendingUp}
            title="Crop Health Index"
            value="87.3"
            unit="%"
            color="from-green-500 to-green-600"
            delay={0.1}
          />
          <MetricCard
            icon={Droplets}
            title="Soil Moisture Level"
            value="62.8"
            unit="%"
            color="from-blue-500 to-blue-600"
            delay={0.2}
          />
          <MetricCard
            icon={AlertTriangle}
            title="Pest Risk Score"
            value="23.4"
            unit="%"
            color="from-yellow-500 to-orange-600"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent-green" />
                <h2 className="text-xl font-bold text-white">Hyperspectral Map</h2>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <ZoomIn className="w-4 h-4 text-gray-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <ZoomOut className="w-4 h-4 text-gray-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Layers className="w-4 h-4 text-gray-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Download className="w-4 h-4 text-gray-300" />
                </motion.button>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-white/10">
              <motion.div
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(74, 222, 128, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(74, 222, 128, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(74, 222, 128, 0.3) 0%, transparent 50%)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="inline-block p-6 rounded-full bg-gradient-to-br from-accent-green/20 to-green-600/20 backdrop-blur-sm border border-accent-green/30 mb-4"
                  >
                    <MapPin className="w-12 h-12 text-accent-green" />
                  </motion.div>
                  <p className="text-gray-400 text-sm">Hyperspectral Imaging Layer</p>
                  <p className="text-gray-500 text-xs mt-1">Real-time field analysis</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-accent-green" />
              <h2 className="text-xl font-bold text-white">AI Insights</h2>
            </div>
            <div className="space-y-3">
              <InsightCard
                id="1"
                title="Nitrogen Deficiency Detected"
                status="North-West Sector"
                severity="medium"
                description="Analysis shows declining nitrogen levels in the north-west sector over the past 7 days. Current levels at 42 ppm, below optimal range."
                recommendation="Apply nitrogen-rich fertilizer at 30kg/hectare. Monitor recovery over 14 days with follow-up hyperspectral scan."
              />
              <InsightCard
                id="2"
                title="Optimal Growth Conditions"
                status="Central Area"
                severity="low"
                description="The central field area shows excellent health metrics with balanced soil pH, optimal moisture, and strong chlorophyll indicators."
                recommendation="Maintain current irrigation schedule. Harvest window opens in 12-15 days for peak yield."
              />
              <InsightCard
                id="3"
                title="Early Pest Activity"
                status="South-East Quadrant"
                severity="high"
                description="Thermal imaging detects early signs of pest activity. Temperature anomalies suggest insect pressure in 3 hectare zone."
                recommendation="Deploy targeted bio-pesticide treatment. Increase monitoring frequency to twice daily in affected zone."
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-card-bg to-transparent backdrop-blur-glass border border-white/10 p-6 shadow-2xl mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-accent-green" />
            <h2 className="text-xl font-bold text-white">Live Sensor Feed</h2>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-2 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30"
            >
              <span className="text-red-400 text-xs font-medium">LIVE</span>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SensorCard
              icon={Thermometer}
              label="Temperature"
              value={sensorData.temperature.toFixed(1)}
              unit="°C"
              color="bg-red-500/80"
              sparkline={[30, 45, 60, 55, 70, 65, 80, 75, 85, 80]}
            />
            <SensorCard
              icon={Wind}
              label="Humidity"
              value={sensorData.humidity.toFixed(1)}
              unit="%"
              color="bg-blue-500/80"
              sparkline={[40, 55, 50, 65, 60, 75, 70, 80, 75, 85]}
            />
            <SensorCard
              icon={FlaskConical}
              label="Soil pH"
              value={sensorData.ph.toFixed(1)}
              unit=""
              color="bg-purple-500/80"
              sparkline={[50, 55, 60, 58, 65, 62, 70, 68, 75, 72]}
            />
            <SensorCard
              icon={Sprout}
              label="Nitrogen"
              value={sensorData.nitrogen.toFixed(1)}
              unit="ppm"
              color="bg-green-500/80"
              sparkline={[35, 45, 50, 55, 60, 58, 65, 70, 68, 75]}
            />
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
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
