import Icon from "../../components/common/Icon";

export default function FeatureCard({ icon, label }) {
  return (
    <div className="bg-white rounded-4 border border-light shadow-sm d-flex flex-column align-items-center text-center p-4 gap-2 transition-all hover-shadow-sm">
      <div className="rounded-circle bg-teal bg-opacity-10 d-flex align-items-center justify-content-center"
           style={{ width: '3rem', height: '3rem' }}>
        <Icon name={icon} className="text-teal" style={{ fontSize: '1.5rem' }} />
      </div>
      <span className="small fw-medium text-dark">{label}</span>
    </div>
  );
}