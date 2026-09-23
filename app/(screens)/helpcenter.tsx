import ContactOption from "@/components/ContactOption";
import CourseCategoryFilter from "@/components/CourseCategoryFilter";
import { Header } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { TabSelector } from "@/components/TabSelector";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  HELP_CONTACT_OPTIONS,
} from "@/constants/mockData";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState("FAQ");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState("elera");

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return HELP_ARTICLES.filter((article) => {
      const matchesCategory = article.category === selectedCategory;
      const matchesSearch =
        !query ||
        article.question.toLowerCase().includes(query) ||
        article.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearch("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Help Center" showMore />
      <TabSelector
        tabs={["FAQ", "Contact us"]}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        activeColor="#0d3a4b"
      />

      {activeTab === "FAQ" ? (
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CourseCategoryFilter
            categories={HELP_CATEGORIES}
            selected={selectedCategory}
            onSelect={(category) => {
              setSelectedCategory(category);
              setExpandedId("");
            }}
          />
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            showFilter={true}
            style={styles.searchBar}
          />

          <View style={styles.articleList}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => {
                const isExpanded = article.id === expandedId;

                return (
                  <TouchableOpacity
                    key={article.id}
                    activeOpacity={0.9}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isExpanded }}
                    onPress={() => setExpandedId(isExpanded ? "" : article.id)}
                    style={[
                      styles.article,
                      isExpanded && styles.expandedArticle,
                    ]}
                  >
                    <View style={styles.questionRow}>
                      <Text style={styles.question}>{article.question}</Text>
                      <Ionicons name="caret-down" size={16} color="#0d3a4b" />
                    </View>
                    {isExpanded && (
                      <View style={styles.answerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.answer}>{article.answer}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptyText}>
                  Try another search or choose a different category.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contactList}
          showsVerticalScrollIndicator={false}
        >
          {HELP_CONTACT_OPTIONS.map((contact) => (
            <ContactOption
              key={contact.id}
              icon={contact.icon as any}
              label={contact.label}
              onPress={() => {
                if (contact.route) {
                  router.push(contact.route as any);
                }
              }}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  searchBar: {
    height: 43,
    marginBottom: 18,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  articleList: {
    gap: 18,
  },
  article: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 19,
    backgroundColor: "#FFFFFF",
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 2,
  },
  expandedArticle: {
    paddingBottom: 17,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  question: {
    flex: 1,
    color: "#292929",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  answerContainer: {
    marginTop: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginBottom: 13,
  },
  answer: {
    color: "#5B5B5B",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    lineHeight: 17,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: "#292929",
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
  },
  emptyText: {
    marginTop: 8,
    color: "#858585",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
    textAlign: "center",
  },
  contactList: {
    gap: 18,
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 28,
  },
});
