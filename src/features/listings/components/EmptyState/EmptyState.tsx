import './EmptyState.css';

interface EmptyStateProps {
  onNavigateHome: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNavigateHome }) => (
  <div className="empty-state">
    <div className="empty-state-icon">🏠</div>
    <h2>No search results yet</h2>
    <p>Use the AI-powered search to find your perfect property</p>
    <button onClick={onNavigateHome} className="empty-state-button">
      Start Searching
    </button>
  </div>
);

export default EmptyState;
