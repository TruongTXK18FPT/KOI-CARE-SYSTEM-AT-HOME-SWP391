package com.swp.group3.login.gui;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.swp.group3.login.pojo.FishData;
import com.swp.group3.login.pojo.PondData;
@RestController
@RequestMapping("/api/koi")
public class CalculateController {

    // API tính lượng muối (Salt calculation)
    @PostMapping("/calculateSalt")
    public ResponseEntity<Double> calculateSalt(@RequestBody PondData pondData) {
        double volume = pondData.getPondVolume(); // Thể tích hồ (lít)
        double saltRate = 0.3; // Tỷ lệ muối luôn là 0.3%
        double saltAmount = (volume * saltRate) / 100; // Lượng muối cần thiết
        return ResponseEntity.ok(saltAmount);
    }

    // API tính lượng thức ăn (Food calculation based on temperature)
    @PostMapping("/calculateFood")
    public ResponseEntity<String> calculateFood(@RequestBody FishData fishData) {
        double totalFishWeight = fishData.getTotalFishWeight(); // Tổng trọng lượng cá (g)
        double temperature = fishData.getTemperature(); // Nhiệt độ của hồ (độ C)
        double foodRate;

        // Xác định tỷ lệ thức ăn theo nhiệt độ
        if (temperature > 20) {
            foodRate = 0.02; // 2-3%
        } else if (temperature >= 15 && temperature <= 20) {
            foodRate = 0.01; // 1-2%
        } else if (temperature < 15 && temperature >= 5) {
            foodRate = 0.005; // 0.5-1%
        } else {
            return ResponseEntity.ok("If tempurature is 5°C. You should not feed Koi Fish."); // Không cho ăn nếu nhiệt độ quá thấp
        }

        double foodAmount = totalFishWeight * foodRate; // Lượng thức ăn cần thiết

        String responseMessage = String.format("Fish Food Needed: %.2f g/day", foodAmount);
        return ResponseEntity.ok(responseMessage);
    }
}
