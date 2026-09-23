import SearchNotFound from "@/assets/images/searchnotfound.svg";
import CourseCard from "@/components/CourseCard";
import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import { COURSE_REVIEWS_META, MOCK_COURSES } from "@/constants/mockData";
import React, { useState } from "react";
import {ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [query, setQuery] = useState("3D Design");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [rating, setRating] = useState<"All" | number>("All");
  const normalizedQuery = query.trim().toLowerCase();
  const results = MOCK_COURSES.filter((course) => {
    const searchableText = `${course.name} ${course.category}`.toLowerCase();
    const matchesQuery = normalizedQuery
      .split(/\s+/)
      .filter(Boolean)
      .every((word) => searchableText.includes(word));
    const matchesCategory = category === "All" || course.category === category;
    const matchesPrice = course.price >= minPrice && course.price <= maxPrice;
    const matchesRating = rating === "All" || course.rating === rating;

    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar
          onChangeText={setQuery}
          placeholder="Search"
          showFilter
          onFilterPress={() => setIsFilterVisible(true)}
          value={query}
        />

        <View style={styles.resultHeader}>
          <Text style={styles.resultText}>
            Results for <Text style={styles.queryText}>“{query}”</Text>
          </Text>
          <Text style={styles.foundText}>{results.length} found</Text>
        </View>

        {results.length > 0 ? (
          <View style={styles.resultsList}>
            {results.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                imageUri={course.imageUri}
                name={course.name}
                category={course.category}
                price={course.price}
                originalPrice={course.originalPrice}
                rating={course.rating}
                totalStudents={course.totalStudents}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <SearchNotFound width={300} height={250} />
            <Text style={styles.emptyTitle}>Not Found</Text>
            <Text style={styles.emptyMessage}>
              Sorry, the keyword you entered cannot be found, please check again
              or search with another keyword.
            </Text>
          </View>
        )}
      </ScrollView>
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
        onReset={() => {
          setCategory("All");
          setMinPrice(0);
          setMaxPrice(100);
          setRating(COURSE_REVIEWS_META.ratingFilters[0]);
        }}
        onApply={() => setIsFilterVisible(false)}
        onClose={() => setIsFilterVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resultText: {
    color: "#35343D",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  queryText: {
    color: "#315BFF",
    fontFamily: "Urbanist-SemiBold",
  },
  foundText: {
    color: "#315BFF",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
  },
  resultsList: {
    marginHorizontal: -10,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingTop: 38,
  },
  emptyTitle: {
    color: "#35343D",
    fontFamily: "Urbanist-Bold",
    fontSize: 26,
    marginTop: 8,
    marginBottom: 10,
  },
  emptyMessage: {
    maxWidth: 290,
    color: "#686770",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },
});
