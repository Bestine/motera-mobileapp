import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  MapPin,
  Phone
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBookings } from "@/hooks/use-bookings";

const statusColors = {
  pending: "#F59E0B",
  confirmed: "#3B82F6",
  "in-progress": "#10B981",
  completed: "#059669",
  cancelled: "#EF4444",
};

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  "in-progress": AlertCircle,
  completed: CheckCircle,
  cancelled: AlertCircle,
};

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const { currentBookings, pastBookings } = useBookings();
  const insets = useSafeAreaInsets();

  const bookings = activeTab === "current" ? currentBookings : pastBookings;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>Track your service requests</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "current" && styles.activeTab
          ]}
          onPress={() => setActiveTab("current")}
        >
          <Text style={[
            styles.tabText,
            activeTab === "current" && styles.activeTabText
          ]}>
            Current
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "past" && styles.activeTab
          ]}
          onPress={() => setActiveTab("past")}
        >
          <Text style={[
            styles.tabText,
            activeTab === "past" && styles.activeTabText
          ]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar color="#8E8E93" size={64} />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyDescription}>
              {activeTab === "current" 
                ? "Book a service to see it here"
                : "Your completed bookings will appear here"
              }
            </Text>
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {bookings.map((booking) => {
              const StatusIcon = statusIcons[booking.status];
              const statusColor = statusColors[booking.status];
              
              return (
                <TouchableOpacity
                  key={booking.id}
                  style={styles.bookingCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.bookingHeader}>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.serviceName}>{booking.service}</Text>
                      <Text style={styles.mechanicName}>{booking.mechanicName}</Text>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: statusColor }
                    ]}>
                      <StatusIcon color="#FFFFFF" size={16} />
                      <Text style={styles.statusText}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.bookingDetails}>
                    <View style={styles.detailRow}>
                      <Calendar color="#8E8E93" size={16} />
                      <Text style={styles.detailText}>
                        {booking.date} at {booking.time}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MapPin color="#8E8E93" size={16} />
                      <Text style={styles.detailText}>{booking.location}</Text>
                    </View>
                  </View>

                  <View style={styles.bookingFooter}>
                    <Text style={styles.price}>${booking.price}</Text>
                    <View style={styles.actionButtons}>
                      {booking.status === "confirmed" && (
                        <TouchableOpacity style={styles.callButton}>
                          <Phone color="#FFFFFF" size={16} />
                          <Text style={styles.callButtonText}>Call</Text>
                        </TouchableOpacity>
                      )}
                      {booking.status === "completed" && (
                        <TouchableOpacity style={styles.reviewButton}>
                          <Text style={styles.reviewButtonText}>Review</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  {booking.status === "in-progress" && (
                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={["#10B981", "#059669"]}
                        style={styles.progressFill}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    textAlign: "center",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#FF6B35",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#8E8E93",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
  bookingsList: {
    gap: 16,
    marginTop: 20,
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginBottom: 4,
  },
  mechanicName: {
    fontSize: 14,
    color: "#8E8E93",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  bookingDetails: {
    gap: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#6B7280",
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FF6B35",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  reviewButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginTop: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "70%",
    borderRadius: 2,
  },
});