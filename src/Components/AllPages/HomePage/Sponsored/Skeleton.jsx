import './skeleton.css';

const SkeletonCard = () => {
  return (
<div className="rounded-xl border border-gray-200 h-[400px] shadow p-4">
      <div className="w-full h-48 shimmer rounded-lg"></div>

      <div className="h-6 shimmer rounded mt-4 w-3/4"></div>
      <div className="h-4 shimmer rounded mt-3 w-1/2"></div>

      <div className="h-4 shimmer rounded mt-4 w-2/3"></div>
      <div className="h-4 shimmer rounded mt-2 w-1/3"></div>

      <div className="h-10 shimmer rounded mt-4 w-full"></div>
    </div>
  );
};

export default SkeletonCard;