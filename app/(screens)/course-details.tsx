import EnrollFooter from "@/components/EnrollFooter";
import LessonItem from "@/components/LessonItem";
import ReviewCard from "@/components/ReviewCard";
import SuccessModal from "@/components/SuccessModal";
import {
  MOCK_COURSES,
  MENTORS,
  COURSE_DETAILS_TABS,
  COURSE_LESSONS_DATA,
  COURSE_REVIEWS_DATA,
  COURSE_REVIEWS_META,
} from "@/constants/mockData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BookmarkSimpleIcon, StarIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const fallbackImage = require("@/assets/images/onboarding-img.png");

const getParam = (value: string | string[] | undefined, fallback = "") =>
  Array.isArray(value) ? (value[0] ?? fallback) : (value ?? fallback);

const getImageSource = (
  value: string | string[] | undefined,
): ImageSourcePropType => {
  const image = getParam(value);
  if (!image) return fallbackImage;
  if (/^https?:\/\//.test(image)) return { uri: image };
  const localImage = Number(image);
  return Number.isNaN(localImage) ? fallbackImage : localImage;
};

const CourseDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    courseId?: string;
  }>();

  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("About");
  const [selectedRating, setSelectedRating] = useState<"All" | number>("All");
  const [isEnrollmentModalVisible, setIsEnrollmentModalVisible] =
    useState(false);

  const courseId = getParam(params.courseId, "ui-ux");
  const details = MOCK_COURSES.find((c) => c.id === courseId) || MOCK_COURSES[0];
  const mentor = MENTORS.find((m) => m.id === details.mentorId) || MENTORS[0];

  const lessons = COURSE_LESSONS_DATA;
  const totalLessons = details.totalLessons;
  const reviews =
    selectedRating === "All"
      ? COURSE_REVIEWS_DATA
      : COURSE_REVIEWS_DATA.filter(
          (review) => review.rating === selectedRating,
        );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ── Hero Image ── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: details.imageUri }}
            style={styles.heroImage}
          />
          <View style={styles.heroActions}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <FontAwesome6 name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          {/* ── Title + Bookmark ── */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{details.name}</Text>
            <TouchableOpacity
              accessibilityLabel={
                bookmarked ? "Remove bookmark" : "Bookmark course"
              }
              onPress={() => setBookmarked((v) => !v)}
            >
              <BookmarkSimpleIcon
                size={23}
                color="#0D3A4B"
                weight={bookmarked ? "fill" : "regular"}
              />
            </TouchableOpacity>
          </View>

          {/* ── Category + Rating ── */}
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{details.category}</Text>
            <StarIcon size={20} color="#FF9F1C" weight="fill" />
            <Text style={styles.muted}>
              {details.rating} ({details.reviewsCount}) Reviews
            </Text>
          </View>

          {/* ── Price ── */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>₦{details.price}</Text>
            <Text style={styles.oldPrice}>₦{details.originalPrice}</Text>
          </View>

          {/* ── Stats ── */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <FontAwesome name="users" size={22} color="#0D3A4B" />
              <Text style={styles.statText}>{details.totalStudents} Students</Text>
            </View>
            <View style={styles.stat}>
              <MaterialCommunityIcons
                name="clock-time-three"
                size={22}
                color="#0D3A4B"
              />
              <Text style={styles.statText}>{details.durationHours} Hour(s)</Text>
            </View>
            {details.hasCertificate && (
              <View style={styles.stat}>
                <MaterialCommunityIcons
                  name="certificate"
                  size={22}
                  color="#0D3A4B"
                />
                <Text style={styles.statText}>Certificate</Text>
              </View>
            )}
          </View>

          {/* ── Tab Bar ── */}
          <View style={styles.tabBar}>
            {COURSE_DETAILS_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={styles.tabItem}
              >
                <Text
                  style={
                    activeTab === tab ? styles.activeTabText : styles.tabText
                  }
                >
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* ═══════════════ ABOUT TAB ═══════════════ */}
          {activeTab === "About" && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mentor</Text>
                <View style={styles.mentorRow}>
                  <Image
                    source={{ uri: mentor.avatarUri }}
                    style={styles.mentorAvatar}
                  />
                  <View style={styles.mentorCopy}>
                    <Text style={styles.mentorName}>{mentor.name}</Text>
                    <Text style={styles.muted}>
                      {mentor.profession}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About Course</Text>
                <Text style={styles.description}>{details.about[0]}</Text>
                <Text style={styles.description}>
                  {details.about[1]}
                  <Text style={styles.readMore}>more...</Text>
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tools</Text>
                {details.tools.map((tool, index) => (
                  <Text key={index} style={styles.tool}>
                    {tool}
                  </Text>
                ))}
              </View>
            </>
          )}

          {/* ═══════════════ LESSONS TAB ═══════════════ */}
          {activeTab === "Lessons" && (
            <View style={styles.lessonsContainer}>
              {/* Header row */}
              <View style={styles.lessonsHeader}>
                <Text style={styles.lessonsCount}>{totalLessons} Lessons</Text>
                <TouchableOpacity onPress={() => router.push("/lessons")}>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              {/* Sections */}
              {lessons.map((section) => (
                <View key={section.id}>
                  {/* Section heading */}
                  <View style={styles.sectionRow}>
                    <Text style={styles.sectionLabel}>{section.title}</Text>
                    <Text style={styles.sectionDuration}>
                      {section.totalDuration}
                    </Text>
                  </View>

                  {/* Lesson rows */}
                  {section.lessons.map((lesson) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      onPress={() =>
                        router.push({
                          pathname: "/course-player",
                          params: { courseId: "1" },
                        })
                      }
                    />
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* ═══════════════ REVIEWS TAB ═══════════════ */}
          {activeTab === "Reviews" && (
            <View style={styles.reviewsContainer}>
              <View style={styles.reviewsHeader}>
                <View style={styles.ratingSummary}>
                  <StarIcon size={20} color="#FF9F1C" weight="fill" />
                  <Text style={styles.overallRating}>
                    {COURSE_REVIEWS_META.overallRating}
                  </Text>
                  <Text style={styles.reviewCount}>
                    ({COURSE_REVIEWS_META.totalReviews} reviews)
                  </Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/reviews")}>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ratingFilters}
              >
                {COURSE_REVIEWS_META.ratingFilters.map((filter) => {
                  const isSelected = selectedRating === filter;
                  return (
                    <TouchableOpacity
                      key={filter}
                      onPress={() => setSelectedRating(filter)}
                      style={[
                        styles.ratingFilter,
                        isSelected && styles.selectedRatingFilter,
                      ]}
                    >
                      <FontAwesome
                        name="star"
                        size={12}
                        color={isSelected ? "#FFFFFF" : "#0D3A4B"}
                      />
                      <Text
                        style={[
                          styles.ratingFilterText,
                          isSelected && styles.selectedRatingFilterText,
                        ]}
                      >
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <EnrollFooter
        coursePrice={details.price.toString()}
        onPress={() => setIsEnrollmentModalVisible(true)}
      />
      <SuccessModal
        isVisible={isEnrollmentModalVisible}
        onClose={() => setIsEnrollmentModalVisible(false)}
        image={require("@/assets/images/success.png")}
        title="Enroll Course Successful!"
        message="You have successfully made payment and enrolled the course."
        primaryButton={{
          title: "View Course",
          onPress: () => {
            setIsEnrollmentModalVisible(false);
            router.push("/lessons");
          },
        }}
        secondaryButton={{
          title: "View E-Receipt",
          onPress: () => {
            setIsEnrollmentModalVisible(false);
            router.push("/ereceipt");
          },
        }}
      />
    </SafeAreaView>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingBottom: 100 },

  /* ── Hero ── */
  hero: { height: 230, backgroundColor: "#14202B" },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  heroActions: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: { padding: 6 },

  /* ── Body ── */
  body: { paddingHorizontal: 15 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 17,
  },
  title: {
    flex: 1,
    color: "#181725",
    fontFamily: "Urbanist-Bold",
    fontSize: 25,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
  category: {
    color: "#0D3A4B",
    backgroundColor: "#EEF2FF",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: "Urbanist-Regular",
    fontSize: 12,
  },
  muted: { color: "#7C7C7C", fontFamily: "Urbanist-Regular", fontSize: 14 },
  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  price: { color: "#0D3A4B", fontFamily: "Urbanist-Bold", fontSize: 28 },
  oldPrice: {
    color: "#999999",
    textDecorationLine: "line-through",
    marginLeft: 12,
    fontSize: 18,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 19,
  },
  stat: { flexDirection: "row", alignItems: "center", gap: 6 },
  statText: { color: "#4C4B56", fontFamily: "Urbanist-Regular", fontSize: 14 },

  /* ── Tab Bar ── */
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: 20,
  },
  tabItem: {
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  activeTabText: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 16,
  },
  tabText: { color: "#999999", fontFamily: "Urbanist-Regular", fontSize: 16 },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "100%",
    backgroundColor: "#0D3A4B",
    borderRadius: 2,
  },

  /* ── About Tab ── */
  section: { marginTop: 20 },
  sectionTitle: {
    color: "#35343D",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
    marginBottom: 12,
  },
  mentorRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  mentorAvatar: { width: 42, height: 42, borderRadius: 21 },
  mentorCopy: { flex: 1, marginLeft: 12 },
  mentorName: {
    color: "#35343D",
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    marginBottom: 3,
  },
  description: {
    color: "#686770",
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: { color: "#0D3A4B", fontFamily: "Urbanist-SemiBold" },
  tool: { color: "#35343D", fontFamily: "Urbanist-SemiBold", fontSize: 16 },

  /* ── Lessons Tab ── */
  lessonsContainer: { marginTop: 16 },
  lessonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  lessonsCount: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
    color: "#181725",
  },
  seeAll: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
    color: "#0D3A4B",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 8,
  },
  sectionLabel: {
    fontFamily: "Urbanist-Bold",
    fontSize: 17,
    color: "#35343D",
  },
  sectionDuration: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    color: "#0D3A4B",
  },

  /* ── Reviews Tab ── */
  reviewsContainer: {
    marginTop: 14,
  },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  ratingSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  overallRating: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
    color: "#35343D",
  },
  reviewCount: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 16,
    color: "#35343D",
  },
  ratingFilters: {
    gap: 8,
    paddingBottom: 4,
  },
  ratingFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#0D3A4B",
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  selectedRatingFilter: {
    backgroundColor: "#0D3A4B",
  },
  ratingFilterText: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
    color: "#0D3A4B",
  },
  selectedRatingFilterText: {
    color: "#FFFFFF",
  },
});
