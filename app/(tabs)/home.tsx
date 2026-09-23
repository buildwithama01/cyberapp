import Filter from "@/components/Filter";
import HomeHeader from "@/components/HomeHeader";
import PopularCoursesSection from "@/components/PopularCoursesSection";
import SearchBar from "@/components/SearchBar";
import { COURSE_REVIEWS_META, MOCK_COURSES } from "@/constants/mockData";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const Home = () => {
  const router = useRouter();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [rating, setRating] = useState<"All" | number>("All");

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;
    const matchesPrice = course.price >= minPrice && course.price <= maxPrice;
    const matchesRating = rating === "All" || course.rating === rating;

    return matchesCategory && matchesPrice && matchesRating;
  });

  const resetFilters = () => {
    setCategory("All");
    setMinPrice(0);
    setMaxPrice(100);
    setRating(COURSE_REVIEWS_META.ratingFilters[0]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeHeader />
      <SearchBar
        onPress={() => router.push("/search")}
        onFilterPress={() => setIsFilterVisible(true)}
      />
      <PopularCoursesSection courses={filteredCourses} onSeeAll={() => {}} />
      <Filter
        visible={isFilterVisible}
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        rating={rating}
        onCategoryChange={setCategory}
        onPriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
        onRatingChange={setRating}
        onReset={resetFilters}
        onApply={() => setIsFilterVisible(false)}
        onClose={() => setIsFilterVisible(false)}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  topbar: {
    alignItems: "center",
    marginBottom: 20,
  },
  locationInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  location: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    color: "#7c7c7c",
  },
});
