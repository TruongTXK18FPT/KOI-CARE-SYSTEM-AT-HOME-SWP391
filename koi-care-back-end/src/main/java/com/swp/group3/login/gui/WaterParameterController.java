package com.swp.group3.login.gui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.WaterParameter;
import com.swp.group3.login.service.IWaterParameterService;
import com.swp.group3.login.service.JwtService;
import com.swp.group3.login.service.AccountService;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/waterparameter")
public class WaterParameterController {

    @Autowired
    private IWaterParameterService waterParameterService;
    @Autowired  
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    

    @PostMapping("/add")
    public ResponseEntity<WaterParameter> addWaterParameter(@RequestBody WaterParameter waterParameter) {
        WaterParameter newWaterParameter = waterParameterService.addWaterParameter(waterParameter);
        return ResponseEntity.ok(newWaterParameter);
    }

    @PutMapping("/update")
    public ResponseEntity<WaterParameter> updateWaterParameter(@RequestBody WaterParameter waterParameter) {
        WaterParameter updatedWaterParameter = waterParameterService.updateWaterParameter(waterParameter);
        return ResponseEntity.ok(updatedWaterParameter);
    }

    @GetMapping("/statistics/{pondId}")
    public ResponseEntity<List<WaterParameter>> getWaterParameterStatistics(@PathVariable Integer pondId) {
        List<WaterParameter> statistics = waterParameterService.getWaterParameterStatistics(pondId);
        return ResponseEntity.ok(statistics);
    }
    @GetMapping("/byPondId/{pondId}")
    public ResponseEntity<?> getWaterParametersByPondId(@RequestHeader("Authorization") String authHeader, @PathVariable Integer pondId) {
        try {
            String token = authHeader.substring(7);
            String email = jwtService.extractEmail(token);

            Optional<Account> accountOpt = accountService.findByEmail(email);
            if (accountOpt.isPresent()) {
                List<WaterParameter> waterParameters = waterParameterService.getWaterParametersByPondId(pondId);
                return ResponseEntity.ok(waterParameters);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error fetching water parameters: " + e.getMessage()));
        }
    }
}

