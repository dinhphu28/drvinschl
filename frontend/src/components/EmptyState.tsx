interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="empty-state">{message}</div>
);

export default EmptyState;
