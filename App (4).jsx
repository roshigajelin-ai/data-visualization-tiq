import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import "./App.css";

/*
  PROFESSIONAL GROWTH ANALYTICS PROTOTYPE
  ---------------------------------------
  React + Recharts prototype for:
  1. Dashboard
  2. Work Opportunities / Jobs
  3. Contracts / Active Work
  4. Training & Upskilling
  5. Assessments

  IMPORTANT:
  - All numbers below are illustrative prototype data.
  - Replace mock arrays with API/database data in production.
  - Install Recharts:
      npm install recharts
  - This file assumes a Vite React application.
*/

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#059669",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#64748b",
];

const dashboardKpis = [
  { label: "New Jobs", value: 24, change: "+20%", tone: "positive" },
  { label: "Applications", value: 12, change: "+15%", tone: "positive" },
  { label: "Pending Review", value: 5, change: "+2", tone: "neutral" },
  { label: "Active Work", value: 3, change: "+1", tone: "positive" },
  { label: "Trainings", value: 4, change: "+25%", tone: "positive" },
  { label: "Certificates", value: 3, change: "+1", tone: "positive" },
  { label: "Verified Skills", value: 4, change: "+2", tone: "positive" },
  { label: "Growth Score", value: "78/100", change: "+8", tone: "positive" },
];

const applicationTrend = [
  { month: "Jan", applications: 4 },
  { month: "Feb", applications: 6 },
  { month: "Mar", applications: 7 },
  { month: "Apr", applications: 9 },
  { month: "May", applications: 8 },
  { month: "Jun", applications: 12 },
  { month: "Jul", applications: 15 },
  { month: "Aug", applications: 18 },
];

const applicationFunnel = [
  { stage: "Applied", count: 50 },
  { stage: "Under Review", count: 32 },
  { stage: "Shortlisted", count: 18 },
  { stage: "Interview", count: 9 },
  { stage: "Selected", count: 4 },
];

const workModeData = [
  { name: "Onsite", value: 40 },
  { name: "Hybrid", value: 35 },
  { name: "Remote", value: 25 },
];

const skillDemand = [
  { skill: "Ultrasonic Testing", jobs: 45 },
  { skill: "Magnetic Particle", jobs: 38 },
  { skill: "Radiographic Testing", jobs: 32 },
  { skill: "Acoustic Emission", jobs: 24 },
  { skill: "AI in Manufacturing", jobs: 17 },
  { skill: "Visual Testing", jobs: 15 },
];

const dashboardSkillGap = [
  { skill: "NDT", user: 80, market: 88 },
  { skill: "MT", user: 55, market: 82 },
  { skill: "UT", user: 35, market: 90 },
  { skill: "AE", user: 70, market: 72 },
  { skill: "AI", user: 60, market: 65 },
];

const growthTrend = [
  { month: "Jan", score: 60 },
  { month: "Feb", score: 64 },
  { month: "Mar", score: 68 },
  { month: "Apr", score: 71 },
  { month: "May", score: 73 },
  { month: "Jun", score: 75 },
  { month: "Jul", score: 77 },
  { month: "Aug", score: 78 },
];

const jobLocations = [
  { location: "Chennai", jobs: 24 },
  { location: "Mumbai", jobs: 18 },
  { location: "Bengaluru", jobs: 15 },
  { location: "Hyderabad", jobs: 11 },
  { location: "Pune", jobs: 9 },
  { location: "Ahmedabad", jobs: 8 },
];

const employmentTypeData = [
  { type: "Full Time", jobs: 32 },
  { type: "Contract", jobs: 22 },
  { type: "Man Day", jobs: 16 },
  { type: "Man Month", jobs: 12 },
  { type: "Part Time", jobs: 9 },
  { type: "Internship", jobs: 7 },
];

const industryDemand = [
  { industry: "Oil & Gas", jobs: 48 },
  { industry: "Manufacturing", jobs: 42 },
  { industry: "Aerospace", jobs: 31 },
  { industry: "Power", jobs: 27 },
  { industry: "Automotive", jobs: 22 },
  { industry: "Marine", jobs: 14 },
];

const jobs = [
  {
    id: 1,
    title: "NDT Inspector",
    company: "Industrial Inspection Services",
    location: "Chennai",
    mode: "Hybrid",
    type: "Full Time",
    skill: "Magnetic Particle",
    match: 94,
    salary: "₹5–7 LPA",
    status: "Open",
  },
  {
    id: 2,
    title: "Acoustic Emission Technician",
    company: "Advanced NDT Solutions",
    location: "Mumbai",
    mode: "Onsite",
    type: "Contract",
    skill: "Acoustic Emission",
    match: 87,
    salary: "₹4–6 LPA",
    status: "Open",
  },
  {
    id: 3,
    title: "Ultrasonic Testing Engineer",
    company: "Precision Engineering",
    location: "Bengaluru",
    mode: "Hybrid",
    type: "Full Time",
    skill: "Ultrasonic Testing",
    match: 82,
    salary: "₹6–9 LPA",
    status: "Open",
  },
  {
    id: 4,
    title: "AI Manufacturing Inspector",
    company: "Smart Factory Labs",
    location: "Hyderabad",
    mode: "Remote",
    type: "Full Time",
    skill: "AI in Manufacturing",
    match: 79,
    salary: "₹7–10 LPA",
    status: "Open",
  },
  {
    id: 5,
    title: "Quality Inspection Technician",
    company: "Global Manufacturing Co.",
    location: "Pune",
    mode: "Onsite",
    type: "Man Day",
    skill: "Visual Testing",
    match: 71,
    salary: "₹2,500/day",
    status: "Open",
  },
  {
    id: 6,
    title: "Radiographic Testing Specialist",
    company: "Energy Inspection Group",
    location: "Ahmedabad",
    mode: "Onsite",
    type: "Contract",
    skill: "Radiographic Testing",
    match: 68,
    salary: "₹5–8 LPA",
    status: "Open",
  },
];

const jobMatchDistribution = [
  { range: "90–100%", jobs: 4 },
  { range: "80–89%", jobs: 7 },
  { range: "70–79%", jobs: 12 },
  { range: "60–69%", jobs: 9 },
  { range: "<60%", jobs: 5 },
];

const contracts = [
  {
    id: "CNT-1001",
    project: "Pipeline Inspection",
    client: "Energy Infrastructure Ltd.",
    role: "NDT Inspector",
    location: "Chennai",
    progress: 90,
    status: "Active",
    value: 125000,
    deadline: "28 Aug 2026",
    hours: 96,
  },
  {
    id: "CNT-1002",
    project: "Manufacturing Quality Audit",
    client: "Precision Components",
    role: "Quality Inspector",
    location: "Pune",
    progress: 62,
    status: "Active",
    value: 84000,
    deadline: "15 Sep 2026",
    hours: 64,
  },
  {
    id: "CNT-1003",
    project: "AE Structural Monitoring",
    client: "Aero Systems",
    role: "AE Technician",
    location: "Mumbai",
    progress: 30,
    status: "Active",
    value: 150000,
    deadline: "05 Oct 2026",
    hours: 28,
  },
];

const contractTrend = [
  { month: "Jan", completed: 2, active: 1 },
  { month: "Feb", completed: 3, active: 1 },
  { month: "Mar", completed: 4, active: 2 },
  { month: "Apr", completed: 5, active: 2 },
  { month: "May", completed: 6, active: 2 },
  { month: "Jun", completed: 8, active: 3 },
  { month: "Jul", completed: 10, active: 3 },
  { month: "Aug", completed: 12, active: 3 },
];

const contractStatusData = [
  { name: "Active", value: 3 },
  { name: "Completed", value: 12 },
  { name: "Pending", value: 2 },
];

const contractPerformance = [
  { project: "Pipeline Inspection", quality: 94, timeliness: 96, client: 92 },
  { project: "Quality Audit", quality: 88, timeliness: 82, client: 90 },
  { project: "AE Monitoring", quality: 91, timeliness: 76, client: 89 },
];

const monthlyEarnings = [
  { month: "Jan", earnings: 55000 },
  { month: "Feb", earnings: 68000 },
  { month: "Mar", earnings: 72000 },
  { month: "Apr", earnings: 85000 },
  { month: "May", earnings: 92000 },
  { month: "Jun", earnings: 108000 },
  { month: "Jul", earnings: 125000 },
  { month: "Aug", earnings: 145000 },
];

const trainingStatusData = [
  { name: "Completed", value: 40 },
  { name: "In Progress", value: 35 },
  { name: "Upcoming", value: 25 },
];

const trainingProgress = [
  { course: "Magnetic Particle Testing", progress: 75 },
  { course: "Acoustic Emission", progress: 60 },
  { course: "AI in Manufacturing", progress: 30 },
  { course: "Ultrasonic Testing", progress: 45 },
];

const learningHours = [
  { week: "W1", hours: 3 },
  { week: "W2", hours: 5 },
  { week: "W3", hours: 7 },
  { week: "W4", hours: 6 },
  { week: "W5", hours: 8 },
  { week: "W6", hours: 9 },
  { week: "W7", hours: 7 },
  { week: "W8", hours: 10 },
];

const trainingSkillImpact = [
  { skill: "NDT Inspection", before: 60, after: 82 },
  { skill: "MT Testing", before: 20, after: 78 },
  { skill: "Defect Detection", before: 40, after: 75 },
  { skill: "Safety", before: 70, after: 90 },
  { skill: "Equipment", before: 45, after: 70 },
];

const courses = [
  {
    id: 1,
    name: "Magnetic Particle Testing",
    provider: "TIQ World Training",
    category: "Non Destructive Testing",
    date: "04 Dec 2026",
    mode: "Online",
    hours: 10,
    progress: 75,
    status: "Enrolled",
    skills: ["Magnetic Particle", "Defect Detection", "NDT Inspection"],
    jobsUnlocked: 18,
  },
  {
    id: 2,
    name: "Ultrasonic Testing",
    provider: "TIQ World Training",
    category: "Non Destructive Testing",
    date: "18 Dec 2026",
    mode: "Online",
    hours: 12,
    progress: 45,
    status: "In Progress",
    skills: ["Ultrasonic Testing", "NDT Inspection"],
    jobsUnlocked: 23,
  },
  {
    id: 3,
    name: "AI in Manufacturing",
    provider: "Industrial AI Academy",
    category: "Industrial AI",
    date: "12 Jan 2027",
    mode: "Hybrid",
    hours: 16,
    progress: 30,
    status: "In Progress",
    skills: ["AI in Manufacturing", "Computer Vision"],
    jobsUnlocked: 14,
  },
  {
    id: 4,
    name: "Acoustic Emission Monitoring",
    provider: "NDT Expert Hub",
    category: "Non Destructive Testing",
    date: "20 Jan 2027",
    mode: "Online",
    hours: 8,
    progress: 100,
    status: "Completed",
    skills: ["Acoustic Emission", "Structural Monitoring"],
    jobsUnlocked: 11,
  },
];

const assessments = [
  {
    id: 1,
    name: "Magnetic Particle Testing",
    type: "Training Assessment",
    status: "Not Started",
    date: "17 Aug 2026",
    score: null,
    attempts: "Unlimited",
    certificate: false,
  },
  {
    id: 2,
    name: "Acoustic Emission Fundamentals",
    type: "Training Assessment",
    status: "Completed",
    date: "10 Aug 2026",
    score: 86,
    attempts: 2,
    certificate: true,
  },
  {
    id: 3,
    name: "NDT Safety",
    type: "Job Assessment",
    status: "Completed",
    date: "03 Aug 2026",
    score: 91,
    attempts: 1,
    certificate: true,
  },
  {
    id: 4,
    name: "Quality Inspection",
    type: "Job Assessment",
    status: "In Progress",
    date: "12 Aug 2026",
    score: 74,
    attempts: 2,
    certificate: false,
  },
  {
    id: 5,
    name: "Visual Testing",
    type: "Training Assessment",
    status: "Completed",
    date: "25 Jul 2026",
    score: 82,
    attempts: 1,
    certificate: true,
  },
];

const assessmentScoreTrend = [
  { attempt: "A1", score: 62 },
  { attempt: "A2", score: 74 },
  { attempt: "A3", score: 86 },
  { attempt: "A4", score: 91 },
];

const assessmentTypeData = [
  { type: "Job", score: 82 },
  { type: "Training", score: 84 },
];

const skillPerformance = [
  { skill: "Magnetic Inspection", score: 82 },
  { skill: "Defect Detection", score: 74 },
  { skill: "Safety", score: 91 },
  { skill: "Equipment", score: 63 },
  { skill: "Reporting", score: 78 },
];

const assessmentStatusData = [
  { name: "Completed", value: 3 },
  { name: "In Progress", value: 1 },
  { name: "Not Started", value: 1 },
];

const assessmentTimeline = [
  { month: "Apr", completed: 1, average: 72 },
  { month: "May", completed: 2, average: 76 },
  { month: "Jun", completed: 3, average: 79 },
  { month: "Jul", completed: 4, average: 81 },
  { month: "Aug", completed: 5, average: 84 },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15,23,42,.08)",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function KpiCard({ label, value, change, tone = "positive", icon }) {
  return (
    <Card className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-change ${tone}`}>
        {tone === "positive" ? "↑" : tone === "negative" ? "↓" : "•"} {change}
      </div>
    </Card>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status ${normalized}`}>{status}</span>;
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">⌁</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="page">
      <div className="hero">
        <div>
          <div className="eyebrow">PROFESSIONAL DASHBOARD</div>
          <h1>Welcome back, Professional 👋</h1>
          <p>
            Your professional growth platform. Track opportunities, learning,
            assessments, contracts, and career progress in one place.
          </p>
        </div>
        <div className="hero-score">
          <span>Career readiness</span>
          <strong>78%</strong>
          <ProgressBar value={78} />
        </div>
      </div>

      <div className="kpi-grid">
        {dashboardKpis.map((item, index) => (
          <KpiCard
            key={item.label}
            label={item.label}
            value={item.value}
            change={item.change}
            tone={item.tone}
            icon={["💼", "📨", "⏳", "🛠", "🎓", "🏆", "✓", "🚀"][index]}
          />
        ))}
      </div>

      <div className="grid-2">
        <Card>
          <SectionTitle
            title="Application Trend"
            subtitle="Applications submitted over the last eight months"
          />
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.12}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle
            title="Career Growth Score"
            subtitle="Your professional growth over time"
          />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid-3">
        <Card>
          <SectionTitle title="Application Funnel" subtitle="Career pipeline" />
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={applicationFunnel}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="stage" width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#2563eb" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Work Mode" subtitle="Opportunity distribution" />
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={workModeData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={3}
              >
                {workModeData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Skill Gap Analysis" subtitle="Your skills vs market demand" />
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={dashboardSkillGap}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="Your Skill"
                dataKey="user"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.18}
              />
              <Radar
                name="Market Demand"
                dataKey="market"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.08}
              />
              <Legend />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Most Demanded Skills"
          subtitle="Skills currently represented by opportunity demand in this prototype dataset"
        />
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={skillDemand} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="skill" type="category" width={150} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="jobs" fill="#059669" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="insight-grid">
        <Card className="insight">
          <span className="insight-icon">🎯</span>
          <div>
            <h3>Biggest Skill Gap</h3>
            <p>Ultrasonic Testing</p>
            <small>Market demand is higher than your current profile level.</small>
          </div>
        </Card>
        <Card className="insight">
          <span className="insight-icon">🎓</span>
          <div>
            <h3>Recommended Learning</h3>
            <p>Ultrasonic Testing</p>
            <small>23 prototype opportunities are associated with this skill.</small>
          </div>
        </Card>
        <Card className="insight">
          <span className="insight-icon">💼</span>
          <div>
            <h3>Top Job Match</h3>
            <p>NDT Inspector — 94%</p>
            <small>Your current skills strongly match this role.</small>
          </div>
        </Card>
      </div>
    </div>
  );
}

function JobsPage() {
  const [mode, setMode] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const modeMatch = mode === "All" || job.mode === mode;
      const typeMatch = type === "All" || job.type === type;
      const searchMatch =
        !search ||
        `${job.title} ${job.company} ${job.skill} ${job.location}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return modeMatch && typeMatch && searchMatch;
    });
  }, [mode, type, search]);

  return (
    <div className="page">
      <div className="hero compact">
        <div>
          <div className="eyebrow">WORK OPPORTUNITIES</div>
          <h1>Find work that matches your skills</h1>
          <p>
            Explore opportunities, understand demand, and see how closely each
            opportunity matches your verified profile.
          </p>
        </div>
      </div>

      <div className="kpi-grid four">
        <KpiCard label="Available Jobs" value="24" change="+20%" icon="💼" />
        <KpiCard label="New Opportunities" value="8" change="+12%" icon="✨" />
        <KpiCard label="Applications" value="12" change="+15%" icon="📨" />
        <KpiCard label="Active Work" value="3" change="+1" icon="🛠" />
      </div>

      <div className="grid-2">
        <Card>
          <SectionTitle title="Jobs by Employment Type" subtitle="Distribution of available work" />
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={employmentTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="jobs" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Job Match Distribution" subtitle="How many opportunities fall into each match range" />
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={jobMatchDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="jobs" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid-3">
        <Card>
          <SectionTitle title="Jobs by Location" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobLocations} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="location" type="category" width={90} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="jobs" fill="#059669" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Industry Demand" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryDemand} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="industry" type="category" width={90} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="jobs" fill="#f59e0b" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Work Mode" />
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={workModeData}
                dataKey="value"
                nameKey="name"
                outerRadius={95}
              >
                {workModeData.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Explore Opportunities"
          subtitle={`${filteredJobs.length} matching prototype opportunities`}
        />
        <div className="filters">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, skills, companies..."
          />
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>All</option>
            <option>Onsite</option>
            <option>Hybrid</option>
            <option>Remote</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All</option>
            <option>Full Time</option>
            <option>Contract</option>
            <option>Man Day</option>
            <option>Man Month</option>
            <option>Part Time</option>
            <option>Internship</option>
          </select>
        </div>

        <div className="job-list">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-avatar">NDT</div>
              <div className="job-main">
                <div className="job-title-row">
                  <h3>{job.title}</h3>
                  <span className="match">{job.match}% match</span>
                </div>
                <p>{job.company}</p>
                <div className="tags">
                  <span>{job.location}</span>
                  <span>{job.mode}</span>
                  <span>{job.type}</span>
                  <span>{job.skill}</span>
                </div>
                <div className="match-row">
                  <span>Profile match</span>
                  <ProgressBar value={job.match} />
                </div>
              </div>
              <div className="job-side">
                <strong>{job.salary}</strong>
                <StatusBadge status={job.status} />
                <button className="primary">View Opportunity</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Skill Demand" subtitle="Top skills associated with available opportunities" />
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={skillDemand} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="skill" type="category" width={155} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="jobs" fill="#2563eb" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="callout">
        <div>
          <strong>Improve your job matches</strong>
          <p>
            Adding verified Ultrasonic Testing and Magnetic Particle Testing
            skills can improve the number of opportunities shown to you.
          </p>
        </div>
        <button className="secondary">Manage Skills</button>
      </div>
    </div>
  );
}

function ContractsPage() {
  const totalValue = contracts.reduce((sum, item) => sum + item.value, 0);
  const totalHours = contracts.reduce((sum, item) => sum + item.hours, 0);
  const averageProgress =
    contracts.reduce((sum, item) => sum + item.progress, 0) / contracts.length;

  return (
    <div className="page">
      <div className="hero compact">
        <div>
          <div className="eyebrow">ACTIVE WORK & CONTRACTS</div>
          <h1>Manage your professional engagements</h1>
          <p>
            Monitor live contracts, project progress, deadlines, earnings, and
            client performance.
          </p>
        </div>
      </div>

      <div className="kpi-grid four">
        <KpiCard label="Active Contracts" value={contracts.length} change="+1" icon="📄" />
        <KpiCard label="Contract Value" value={formatCurrency(totalValue)} change="+18%" icon="💰" />
        <KpiCard label="Work Hours" value={totalHours} change="+14%" icon="⏱" />
        <KpiCard label="Avg. Progress" value={`${Math.round(averageProgress)}%`} change="+7%" icon="📈" />
      </div>

      <div className="grid-2">
        <Card>
          <SectionTitle title="Monthly Earnings" subtitle="Illustrative contract earnings trend" />
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => formatCurrency(value)}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#059669"
                fill="#059669"
                fillOpacity={0.12}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Contract Status" subtitle="Current work portfolio" />
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={contractStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={105}
              >
                {contractStatusData.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Contract Performance" subtitle="Quality, timeliness, and client satisfaction" />
        <ResponsiveContainer width="100%" height={340}>
          <RadarChart data={contractPerformance}>
            <PolarGrid />
            <PolarAngleAxis dataKey="project" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar name="Quality" dataKey="quality" stroke="#2563eb" fill="#2563eb" fillOpacity={0.12} />
            <Radar name="Timeliness" dataKey="timeliness" stroke="#059669" fill="#059669" fillOpacity={0.10} />
            <Radar name="Client" dataKey="client" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.08} />
            <Legend />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle title="Active Contracts" subtitle="Live contracts and completion status" />
        <div className="contract-list">
          {contracts.map((contract) => (
            <div className="contract-card" key={contract.id}>
              <div className="contract-icon">📋</div>
              <div className="contract-main">
                <div className="job-title-row">
                  <h3>{contract.project}</h3>
                  <StatusBadge status={contract.status} />
                </div>
                <p>{contract.client}</p>
                <div className="contract-meta">
                  <span>Role: {contract.role}</span>
                  <span>Location: {contract.location}</span>
                  <span>Deadline: {contract.deadline}</span>
                  <span>Hours: {contract.hours}</span>
                </div>
                <div className="progress-label">
                  <span>Completion</span>
                  <strong>{contract.progress}%</strong>
                </div>
                <ProgressBar value={contract.progress} />
              </div>
              <div className="contract-side">
                <span>Contract value</span>
                <strong>{formatCurrency(contract.value)}</strong>
                <button className="primary">Manage Contract</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Completed vs Active Work" subtitle="Historical contract volume" />
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={contractTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="completed" stroke="#2563eb" strokeWidth={3} />
            <Line type="monotone" dataKey="active" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid-3">
        <Card className="metric-card">
          <span>On-time completion</span>
          <strong>96%</strong>
          <ProgressBar value={96} />
        </Card>
        <Card className="metric-card">
          <span>Client satisfaction</span>
          <strong>4.7 / 5</strong>
          <ProgressBar value={94} />
        </Card>
        <Card className="metric-card">
          <span>Repeat client rate</span>
          <strong>72%</strong>
          <ProgressBar value={72} />
        </Card>
      </div>
    </div>
  );
}

function TrainingPage() {
  const completed = courses.filter((course) => course.status === "Completed").length;
  const avgProgress =
    courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;
  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);

  return (
    <div className="page">
      <div className="hero compact">
        <div>
          <div className="eyebrow">TRAINING & UPSKILLING</div>
          <h1>Build skills that improve your career opportunities</h1>
          <p>
            Track course progress, learning hours, skill development, and the
            career impact of your training.
          </p>
        </div>
        <button className="primary large">Explore Catalog</button>
      </div>

      <div className="kpi-grid four">
        <KpiCard label="Courses" value={courses.length} change="+2" icon="📚" />
        <KpiCard label="Enrolled" value="3" change="+1" icon="🎓" />
        <KpiCard label="Average Progress" value={`${Math.round(avgProgress)}%`} change="+9%" icon="📈" />
        <KpiCard label="Completed" value={completed} change="+1" icon="🏆" />
      </div>

      <div className="grid-2">
        <Card>
          <SectionTitle title="Learning Hours" subtitle="Weekly learning activity" />
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={learningHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.12}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Learning Status" subtitle="Course portfolio distribution" />
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={trainingStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={105}
              >
                {trainingStatusData.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Course Progress" subtitle="Current progress across learning programs" />
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={trainingProgress} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="course" type="category" width={175} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="progress" fill="#7c3aed" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle
          title="Current Learning"
          subtitle="Your enrolled and active courses"
        />
        <div className="course-list">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-image">
                {course.name === "Magnetic Particle Testing" ? "MAGNETIC PARTICLE" : "TRAINING"}
              </div>
              <div className="course-main">
                <div className="job-title-row">
                  <h3>{course.name}</h3>
                  <StatusBadge status={course.status} />
                </div>
                <p>{course.provider} · {course.category}</p>
                <div className="tags">
                  <span>{course.date}</span>
                  <span>{course.mode}</span>
                  <span>{course.hours}h</span>
                </div>
                <div className="progress-label">
                  <span>Course progress</span>
                  <strong>{course.progress}%</strong>
                </div>
                <ProgressBar value={course.progress} />
                <div className="skill-pills">
                  {course.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className="course-side">
                <span>Career impact</span>
                <strong>{course.jobsUnlocked} jobs</strong>
                <button className="primary">
                  {course.progress === 100 ? "Review" : "Continue"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Skills Before vs After Training"
          subtitle="Illustrative skill development from learning activity"
        />
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={trainingSkillImpact}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="before" fill="#94a3b8" name="Before" />
            <Bar dataKey="after" fill="#2563eb" name="After" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="career-impact">
        <div>
          <div className="eyebrow">CAREER IMPACT</div>
          <h2>Training should connect directly to employability.</h2>
          <p>
            Magnetic Particle Testing can be connected to verified skills,
            assessment results, and matching job opportunities.
          </p>
        </div>
        <div className="impact-stat">
          <span>Potential job matches</span>
          <strong>+18</strong>
          <small>after relevant skill verification</small>
        </div>
      </div>

      <Card>
        <SectionTitle title="Recommended Learning Path" subtitle="Skill gap driven recommendations" />
        <div className="learning-path">
          {[
            ["01", "Magnetic Particle Testing", "Current", 75],
            ["02", "Ultrasonic Testing", "Recommended", 45],
            ["03", "NDT Level II Certification", "Next", 0],
            ["04", "Advanced Inspection Reporting", "Future", 0],
          ].map(([number, name, status, progress]) => (
            <div className="path-step" key={number}>
              <div className="path-number">{number}</div>
              <div className="path-content">
                <strong>{name}</strong>
                <span>{status}</span>
                <ProgressBar value={progress} />
              </div>
              {number !== "04" && <div className="path-arrow">→</div>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AssessmentsPage() {
  const completed = assessments.filter((a) => a.status === "Completed");
  const scored = assessments.filter((a) => typeof a.score === "number");
  const average =
    scored.reduce((sum, a) => sum + a.score, 0) / scored.length;
  const passed = scored.filter((a) => a.score >= 70).length;

  return (
    <div className="page">
      <div className="hero compact">
        <div>
          <div className="eyebrow">ASSESSMENTS</div>
          <h1>Track and complete your job and training assessments</h1>
          <p>
            Measure performance, identify weak areas, earn certificates, and
            improve your job eligibility.
          </p>
        </div>
      </div>

      <div className="kpi-grid four">
        <KpiCard label="Total Assessments" value={assessments.length} change="+2" icon="📝" />
        <KpiCard label="Completed" value={completed.length} change="+1" icon="✓" />
        <KpiCard label="Average Score" value={`${Math.round(average)}%`} change="+6%" icon="📊" />
        <KpiCard label="Pass Rate" value={`${Math.round((passed / scored.length) * 100)}%`} change="+8%" icon="🏆" />
      </div>

      <div className="grid-2">
        <Card>
          <SectionTitle title="Score Improvement" subtitle="Assessment performance across attempts" />
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={assessmentScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="attempt" />
              <YAxis domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Assessment Status" subtitle="Completion distribution" />
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={assessmentStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={105}
              >
                {assessmentStatusData.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Skill Performance"
          subtitle="Assessment performance by capability area"
        />
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={skillPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="skill" type="category" width={150} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="score" fill="#f59e0b" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid-2">
        <Card>
          <SectionTitle title="Job vs Training Assessments" subtitle="Average score by assessment type" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assessmentTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Assessment Activity" subtitle="Completed assessments and average score" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={assessmentTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="completed" stroke="#059669" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="average" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Assessment List"
          subtitle="Complete required assessments and track results"
        />
        <div className="assessment-table-wrap">
          <table className="assessment-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Score</th>
                <th>Certificate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td>
                    <strong>{assessment.name}</strong>
                    <small>{assessment.attempts} attempts</small>
                  </td>
                  <td>{assessment.type}</td>
                  <td><StatusBadge status={assessment.status} /></td>
                  <td>{assessment.date}</td>
                  <td>
                    {assessment.score === null ? "—" : `${assessment.score}%`}
                  </td>
                  <td>{assessment.certificate ? "🏆 Earned" : "—"}</td>
                  <td>
                    <button className="primary small">
                      {assessment.status === "Not Started"
                        ? "Take Assessment"
                        : assessment.status === "In Progress"
                        ? "Continue"
                        : "Review"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid-3">
        <Card className="metric-card">
          <span>Assessment readiness</span>
          <strong>78%</strong>
          <ProgressBar value={78} />
          <small>Based on course progress and previous scores.</small>
        </Card>
        <Card className="metric-card">
          <span>Certificates earned</span>
          <strong>3</strong>
          <ProgressBar value={60} />
          <small>3 of 5 prototype assessments certified.</small>
        </Card>
        <Card className="metric-card">
          <span>Best score</span>
          <strong>91%</strong>
          <ProgressBar value={91} />
          <small>NDT Safety assessment.</small>
        </Card>
      </div>

      <div className="callout warning">
        <div>
          <strong>Action required: Magnetic Particle Testing</strong>
          <p>
            Your training assessment is not started. Complete the course
            preparation and take the assessment to unlock the related skill
            verification workflow.
          </p>
        </div>
        <button className="primary">Take Assessment</button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("dashboard");

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "jobs", label: "Work Opportunities", icon: "💼" },
    { id: "contracts", label: "Contracts", icon: "📄" },
    { id: "training", label: "Training & Upskilling", icon: "🎓" },
    { id: "assessments", label: "Assessments", icon: "📝" },
  ];

  function renderPage() {
    if (page === "jobs") return <JobsPage />;
    if (page === "contracts") return <ContractsPage />;
    if (page === "training") return <TrainingPage />;
    if (page === "assessments") return <AssessmentsPage />;
    return <DashboardPage />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <div>
            <strong>TIQ World</strong>
            <span>Professional Portal</span>
          </div>
        </div>

        <div className="profile-mini">
          <div className="profile-avatar">P</div>
          <div>
            <strong>Professional</strong>
            <span>Verified profile</span>
          </div>
        </div>

        <nav>
          <div className="nav-label">MENU</div>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="readiness-mini">
            <span>Career readiness</span>
            <strong>78%</strong>
            <ProgressBar value={78} />
          </div>
          <button className="nav-item">⚙ Settings</button>
          <button className="nav-item">↪ Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Professional / {navigation.find((x) => x.id === page)?.label}</span>
          </div>
          <div className="top-actions">
            <button className="icon-button">🔔</button>
            <button className="profile-button">
              <span className="profile-avatar small">P</span>
              Professional
              <span>⌄</span>
            </button>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default App;
