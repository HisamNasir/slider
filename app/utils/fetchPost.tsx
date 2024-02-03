import postsData from "@/public/Data.json";

export const fetchPosts = (startIndex, endIndex) => {
  return postsData.slice(startIndex, endIndex);
};
