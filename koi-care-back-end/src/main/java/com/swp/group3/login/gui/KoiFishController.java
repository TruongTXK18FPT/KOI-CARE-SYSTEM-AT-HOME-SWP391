package com.swp.group3.login.gui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.swp.group3.login.pojo.KoiFish;
import com.swp.group3.login.service.IKoiFishService;

@RestController
@RequestMapping("/api/koifish")
public class KoiFishController {

    @Autowired
    private IKoiFishService koiFishService;

    @GetMapping("/getAll")
    public ResponseEntity<Page<KoiFish>> getAllKoiFish(Pageable pageable) {
        return ResponseEntity.ok(koiFishService.getAllKoiFish(pageable));
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<KoiFish> getKoiFishById(@PathVariable Integer id) {
        return koiFishService.getKoiFishById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pond/getByPondId/{pondId}")
    public ResponseEntity<Page<KoiFish>> getKoiFishByPondId(@PathVariable Integer pondId, Pageable pageable) {
        Page<KoiFish> koiFish = koiFishService.getKoiFishByPondId(pondId, pageable);
        return koiFish.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(koiFish);
    }
    
    @PostMapping("/add")
    public ResponseEntity<KoiFish> createKoiFish(@RequestBody KoiFish koiFish) {
        return ResponseEntity.ok(koiFishService.addKoiFish(koiFish));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<KoiFish> updateKoiFish(@PathVariable Integer id, @RequestBody KoiFish koiFish) {
        return koiFishService.updateKoiFish(id, koiFish)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteKoiFish(@PathVariable Integer id) {
        return koiFishService.deleteKoiFish(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
