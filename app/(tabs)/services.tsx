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
  Wrench, 
  Car, 
  Zap, 
  Settings, 
  Gauge, 
  Fuel,
  Shield,
  Wind
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useServices } from "@/hooks/use-services";

const serviceIcons = {
  "Engine Repair": Car,
  "Brake Service": Shield,
  "Oil Change": Fuel,
  "Tire Service": Settings,
  "Battery Service": Zap,
  "AC Repair": Wind,
  "Transmission": Gauge,
  "General Maintenance": Wrench,
};

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { serviceCategories, getServicesByCategory } = useServices();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <Text style={styles.headerTitle}>Services</Text>
        <Text style={styles.headerSubtitle}>Choose the service you need</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesGrid}>
          {serviceCategories.map((category) => {
            const IconComponent = serviceIcons[category.name as keyof typeof serviceIcons] || Wrench;
            const isSelected = selectedCategory === category.name;
            
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(
                  isSelected ? null : category.name
                )}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.categoryIcon,
                  isSelected && styles.categoryIconSelected
                ]}>
                  <IconComponent 
                    color={isSelected ? "#FFFFFF" : "#FF6B35"} 
                    size={32} 
                  />
                </View>
                <Text style={[
                  styles.categoryName,
                  isSelected && styles.categoryNameSelected
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.categoryDescription,
                  isSelected && styles.categoryDescriptionSelected
                ]}>
                  {category.description}
                </Text>
                <Text style={[
                  styles.categoryPrice,
                  isSelected && styles.categoryPriceSelected
                ]}>
                  From ${category.startingPrice}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedCategory && (
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceDetailsTitle}>
              {selectedCategory} Services
            </Text>
            <View style={styles.servicesList}>
              {getServicesByCategory(selectedCategory).map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceDescription}>
                      {service.description}
                    </Text>
                    <Text style={styles.serviceDuration}>
                      Duration: {service.duration}
                    </Text>
                  </View>
                  <View style={styles.servicePricing}>
                    <Text style={styles.servicePrice}>${service.price}</Text>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.emergencySection}>
          <LinearGradient
            colors={["#DC2626", "#EF4444"]}
            style={styles.emergencyCard}
          >
            <Text style={styles.emergencyTitle}>Emergency Service</Text>
            <Text style={styles.emergencyDescription}>
              Need immediate roadside assistance? We&apos;re here 24/7
            </Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Call Emergency</Text>
            </TouchableOpacity>
          </LinearGradient>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 20,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryCardSelected: {
    borderColor: "#FF6B35",
    backgroundColor: "#FF6B35",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIconSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  categoryNameSelected: {
    color: "#FFFFFF",
  },
  categoryDescription: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 12,
  },
  categoryDescriptionSelected: {
    color: "#FFE4E1",
  },
  categoryPrice: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FF6B35",
  },
  categoryPriceSelected: {
    color: "#FFFFFF",
  },
  serviceDetails: {
    marginTop: 32,
    marginBottom: 20,
  },
  serviceDetailsTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1F2937",
    marginBottom: 16,
  },
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1F2937",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  serviceDuration: {
    fontSize: 12,
    color: "#6B7280",
  },
  servicePricing: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FF6B35",
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  emergencySection: {
    marginVertical: 20,
  },
  emergencyCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: "#FEE2E2",
    textAlign: "center",
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#DC2626",
  },
});