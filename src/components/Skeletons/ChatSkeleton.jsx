const ChatSkeleton = () => {
  const skeletonMessages = Array(5).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-pulse">
      {skeletonMessages.map((_, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`flex flex-col ${isLeft ? "items-start" : "items-end"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {isLeft && (
                <div className="w-8 h-8 rounded-full bg-gray-700/50" />
              )}
              <div className="h-3 w-16 bg-gray-700/40 rounded" />
              {!isLeft && (
                <div className="w-8 h-8 rounded-full bg-gray-700/50" />
              )}
            </div>
            <div
              className={`h-16 w-50 md:w-62.5 rounded-2xl bg-gray-700/30 ${
                isLeft ? "rounded-bl-none" : "rounded-br-none"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatSkeleton;
