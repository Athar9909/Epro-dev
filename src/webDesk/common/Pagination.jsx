import { motion, AnimatePresence } from "framer-motion";

const Pagination = ({
  current = 1,
  total = 0,
  pageSize = 15,
  siblingCount = 1,
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const range = (start, end) => {
    return [...Array(end - start + 1).keys()].map((x) => x + start);
  };

  const getPages = () => {
    const totalNumbers = siblingCount * 2 + 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) return range(1, totalPages);

    const startPage = Math.max(2, current - siblingCount);
    const endPage = Math.min(totalPages - 1, current + siblingCount);
    const pages = range(startPage, endPage);

    const hasLeftDots = startPage > 2;
    const hasRightDots = endPage < totalPages - 1;

    if (hasLeftDots && hasRightDots) {
      return [1, "...", ...pages, "...", totalPages];
    }

    if (!hasLeftDots && hasRightDots) {
      return [...range(1, 3 + siblingCount), "...", totalPages];
    }

    if (hasLeftDots && !hasRightDots) {
      return [1, "...", ...range(totalPages - (2 + siblingCount), totalPages)];
    }

    return range(1, totalPages);
  };

  return (
    <motion.div
      layout
      className="flex justify-center items-center gap-2 mt-4 flex-wrap"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}>
      {/* Previous */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 rounded-md bg-[#F7F7F7] text-black text-sm font-medium disabled:opacity-50">
        Previous
      </motion.button>

      {/* Page Buttons */}
      <AnimatePresence mode="wait">
        {getPages().map((page, idx) =>
          page === "..." ? (
            <motion.span
              key={`ellipsis-${idx}`}
              className="text-lg font-bold mx-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              ...
            </motion.span>
          ) : (
            <motion.button
              key={page}
              onClick={() => onChange(page)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              layout
              className={`w-9 h-9 rounded-md text-sm font-semibold transition-colors duration-200 ${
                current === page
                  ? "bg-[#009EB4] text-white"
                  : "bg-white text-[#000] border border-gray-300"
              }`}>
              {String(page).padStart(2, "0")}
            </motion.button>
          )
        )}
      </AnimatePresence>

      {/* Next */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
        className="px-3 py-1 rounded-md bg-[#009EB4] text-white text-sm font-medium disabled:opacity-50">
        Next Page
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
