import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, MapPin, Star, Clock, Phone } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMechanics } from "@/hooks/use-mechanics";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { mechanics, nearbyMechanics } = useMechanics();
  const insets = useSafeAreaInsets();

  const filteredMechanics = searchQuery
    ? mechanics.filter(
        (mechanic) =>
          mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mechanic.services.some((service) =>
            service.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : nearbyMechanics;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>MOTERA</Text>
          <Text style={styles.headerSubtitle}>Find mechanics near you</Text>
          
          <View style={styles.searchContainer}>
            <Search color="#8E8E93" size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services or mechanics..."
              placeholderTextColor="#8E8E93"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.locationHeader}>
          <MapPin color="#FF6B35" size={20} />
          <Text style={styles.locationText}>Mechanics near you</Text>
        </View>

        <View style={styles.mechanicsGrid}>
          {filteredMechanics.map((mechanic) => (
            <TouchableOpacity
              key={mechanic.id}
              style={styles.mechanicCard}
              activeOpacity={0.7}
            >
              <View style={styles.mechanicHeader}>
                <View style={styles.mechanicAvatar}>
                  <Text style={styles.mechanicInitials}>
                    {mechanic.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.mechanicInfo}>
                  <Text style={styles.mechanicName}>{mechanic.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Star color="#FFD700" size={16} fill="#FFD700" />
                    <Text style={styles.rating}>{mechanic.rating}</Text>
                    <Text style={styles.reviewCount}>({mechanic.reviews})</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Phone color="#FFFFFF" size={18} />
                </TouchableOpacity>
              </View>

              <View style={styles.mechanicDetails}>
                <View style={styles.distanceContainer}>
                  <MapPin color="#8E8E93" size={14} />
                  <Text style={styles.distance}>{mechanic.distance} away</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Clock color="#8E8E93" size={14} />
                  <Text style={styles.availability}>{mechanic.availability}</Text>
                </View>
              </View>

              <View style={styles.servicesContainer}>
                <Text style={styles.servicesLabel}>Services:</Text>
                <View style={styles.servicesTags}>
                  {mechanic.services.slice(0, 3).map((service) => (
                    <View key={service} style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>{service}</Text>
                    </View>
                  ))}
                  {mechanic.services.length > 3 && (
                    <View style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>
                        +{mechanic.services.length - 3} more
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Starting from</Text>
                <Text style={styles.price}>${mechanic.startingPrice}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {},
  headerTitle: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginLeft: 8,
  },
  mechanicsGrid: {
    gap: 16,
    paddingBottom: 20,
  },
  mechanicCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  mechanicHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  mechanicAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  mechanicInitials: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  mechanicInfo: {
    flex: 1,
    marginLeft: 12,
  },
  mechanicName: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  mechanicDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availability: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
  servicesContainer: {
    marginBottom: 16,
  },
  servicesLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginBottom: 8,
  },
  servicesTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  serviceTag: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  serviceTagText: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: "#1E40AF",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  priceLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  price: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FF6B35",
  },
});