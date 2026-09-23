import CompletedSVG from "@/assets/images/completed.svg";
import { Header } from "@/components/Header";
import LessonItem from "@/components/LessonItem";
import PrimaryButton from "@/components/PrimaryButton";
import SuccessModal from "@/components/SuccessModal";
import {
  COURSE_LESSONS_DATA,
  CURRENT_USER,
  ENROLLMENTS,
  MOCK_COURSES,
} from "@/constants/mockData";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CompletedCourse = () => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const enrollment =
    ENROLLMENTS.find(
      (e) => e.userId === CURRENT_USER.id && e.courseId === courseId,
    ) || ENROLLMENTS[0];
  const course = MOCK_COURSES.find((c) => c.id === enrollment.courseId)!;
  const [activeTab, setActiveTab] = useState("Lessons");
  const [isCourseCompleteVisible, setIsCourseCompleteVisible] = useState(true);

  const handleWriteReview = () => {
    setIsCourseCompleteVisible(false);
    router.push({
      pathname: "/course-review",
      params: {
        sectionId: "s1",
        answers: JSON.stringify({}),
      },
    });
  };

  const handleDownloadCertificate = async () => {
    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; background: #f5f7f9; display: flex; justify-content: center; padding: 24px;">
          <div style="width: 760px; border: 3px solid #0d3a4b; border-radius: 18px; background: #f5f7f9; padding: 36px 32px; text-align: center;">
            <div style="width: 82px; height: 82px; margin: 0 auto 18px; border-radius: 50%; background: #eaf4ff; color: #0d3a4b; font-size: 58px; font-weight: 700; display: flex; align-items: center; justify-content: center;">e</div>
            <h1 style="margin: 0; color: #0d3a4b; font-size: 34px;">Certificate of Completion</h1>
            <p style="margin: 28px 0 0; color: #4c4f54; font-size: 20px;">Presented to</p>
            <h2 style="margin: 10px 0 0; color: #0d3a4b; font-size: 32px; font-weight: 700;">${CURRENT_USER.fullName}</h2>
            <p style="margin: 26px 0 0; color: #4e5560; font-size: 18px;">For the successful completion of</p>
            <h3 style="margin: 12px 0 0; color: #0d3a4b; font-size: 26px; font-weight: 700;">${course.name}</h3>
            <p style="margin: 18px 0 0; color: #4e5560; font-size: 18px;">Issued on ${enrollment.certificateIssuedAt}</p>
            <p style="margin: 8px 0 0; color: #4e5560; font-size: 18px;">ID: ${enrollment.certificateId}</p>
            <div style="margin: 22px auto 0; width: 180px; color: #0d3a4b; font-size: 54px; font-weight: 700; transform: rotate(-8deg);">M</div>
            <h4 style="margin: 8px 0 0; color: #0d3a4b; font-size: 24px; font-weight: 700;">James Anderson Lawren</h4>
            <p style="margin: 8px 0 0; color: #5d6470; font-size: 16px;">Elera Courses Manager</p>
          </div>
        </body>
      </html>
    `;

    const fileName = `${course.name.trim().replace(/\s+/g, "-").toLowerCase()}-certificate.html`;
    const fileUri = `${(FileSystem as any).documentDirectory}${fileName}`;

    await (FileSystem as any).writeAsStringAsync(fileUri, html, {
      encoding: (FileSystem as any).EncodingType.UTF8,
    });

    await Share.share({
      title: "Certificate",
      message: "Your certificate has been downloaded.",
      url: fileUri,
    });

    Alert.alert("Certificate downloaded", "Your certificate has been saved.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={course.name} onMorePress={() => undefined} />

      <View style={styles.tabs}>
        {["Lessons", "Certificates"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "Lessons" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {COURSE_LESSONS_DATA.map((section) => (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDuration}>
                  {section.totalDuration}
                </Text>
              </View>
              <View style={styles.lessonsList}>
                {section.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={{ ...lesson, isUnlocked: true }}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.certificateWrap}>
          <View style={styles.certificateCard}>
            <View style={styles.waveField}>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={`wave-${index}`}
                  style={[
                    styles.waveLine,
                    {
                      top: 24 + index * 12,
                      left: -80 + index * 12,
                      width: 540,
                    },
                  ]}
                />
              ))}
            </View>

            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>e</Text>
            </View>

            <Text style={styles.certificateTitle}>
              Certificate of Completion
            </Text>
            <Text style={styles.presentedText}>Presented to</Text>
            <Text style={styles.studentName}>{CURRENT_USER.fullName}</Text>
            <Text style={styles.completionText}>
              For the successful completion of
            </Text>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.issueText}>
              Issued on {enrollment.certificateIssuedAt}
            </Text>
            <Text style={styles.idText}>ID: {enrollment.certificateId}</Text>

            <View style={styles.signatureWrap}>
              <Text style={styles.signatureText}>M</Text>
            </View>
            <Text style={styles.signatureName}>James Anderson Lawren</Text>
            <Text style={styles.roleText}>Elera Courses Manager</Text>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        {activeTab === "Certificates" ? (
          <PrimaryButton
            title="Download Certificate"
            onPress={handleDownloadCertificate}
            style={styles.downloadButton}
          />
        ) : (
          <PrimaryButton
            title="Watch Course Again"
            onPress={() =>
              router.push({
                pathname: "/course-player",
                params: { courseId: course.id },
              })
            }
            style={styles.primaryButton}
          />
        )}
      </View>

      <SuccessModal
        isVisible={isCourseCompleteVisible}
        title="Course Completed"
        message="Congratulations! You have successfully completed this course. Would you like to leave a quick review?"
        onClose={() => setIsCourseCompleteVisible(false)}
        svg={CompletedSVG}
        primaryButton={{
          title: "Write Review",
          onPress: handleWriteReview,
        }}
        secondaryButton={{
          title: "Cancel",
          onPress: () => setIsCourseCompleteVisible(false),
        }}
      />
    </SafeAreaView>
  );
};

export default CompletedCourse;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 14,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
  tabText: { color: "#AAAAAA", fontFamily: "Urbanist-Regular", fontSize: 18 },
  activeTabText: { color: "#0D3A4B", fontFamily: "Urbanist-SemiBold" },
  indicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#0D3A4B",
  },
  content: { paddingHorizontal: 23, paddingBottom: 110 },
  section: { marginBottom: 6 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#686770",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 15,
  },
  sectionDuration: {
    color: "#315BFF",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  lessonsList: { gap: 12 },
  certificateWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 110,
  },
  certificateCard: {
    position: "relative",
    backgroundColor: "#F5F7F9",
    borderWidth: 3,
    borderColor: "#0D3A4B",
    borderRadius: 18,
    paddingTop: 18,
    paddingBottom: 28,
    paddingHorizontal: 18,
    alignItems: "center",
    overflow: "hidden",
  },
  waveField: {
    position: "absolute",
    inset: 0,
    opacity: 0.65,
  },
  waveLine: {
    position: "absolute",
    height: 360,
    borderWidth: 1,
    borderColor: "rgba(61, 87, 125, 0.12)",
    borderRadius: 999,
    transform: [{ rotate: "-4deg" }],
  },
  logoCircle: {
    width: 82,
    height: 82,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 41,
    backgroundColor: "#EAF4FF",
    marginBottom: 8,
  },
  logoText: {
    color: "#0d3a4b",
    fontFamily: "Urbanist-Bold",
    fontSize: 56,
    lineHeight: 56,
  },
  certificateTitle: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 26,
    textAlign: "center",
    marginTop: 8,
  },
  presentedText: {
    marginTop: 18,
    color: "#4C4F54",
    fontFamily: "Urbanist-Regular",
    fontSize: 17,
  },
  studentName: {
    marginTop: 10,
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 28,
    textAlign: "center",
  },
  completionText: {
    marginTop: 18,
    color: "#4E5560",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
    textAlign: "center",
  },
  courseName: {
    marginTop: 10,
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 21,
    textAlign: "center",
  },
  issueText: {
    marginTop: 12,
    color: "#4E5560",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
  },
  idText: {
    marginTop: 6,
    color: "#4E5560",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
  },
  signatureWrap: {
    marginTop: 18,
    width: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  signatureText: {
    color: "#0d3a4b",
    fontFamily: "Urbanist-Bold",
    fontSize: 56,
    transform: [{ rotate: "-10deg" }],
  },
  signatureName: {
    marginTop: 8,
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
    textAlign: "center",
  },
  roleText: {
    marginTop: 8,
    color: "#5D6470",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    padding: 23,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 12,
  },
  primaryButton: {
    height: 54,
    paddingVertical: 0,
  },
  secondaryButton: {
    backgroundColor: "#EAF4F8",
  },
  downloadButton: {
    height: 58,
    paddingVertical: 0,
    borderRadius: 20,
    backgroundColor: "#0d3a4b",
  },
});
