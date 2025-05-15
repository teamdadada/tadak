package com.ssafy.tadak.spring.product.domain.entity;

import com.redis.om.spring.metamodel.MetamodelField;
import com.redis.om.spring.metamodel.SearchFieldAccessor;
import com.redis.om.spring.metamodel.indexed.NumericField;
import com.redis.om.spring.metamodel.indexed.TextTagField;
import java.lang.Long;
import java.lang.NoSuchFieldException;
import java.lang.SecurityException;
import java.lang.String;
import java.lang.reflect.Field;

public final class ProductLog$ {
  public static Field timestamp;

  public static Field id;

  public static Field productId;

  public static Field userId;

  public static NumericField<ProductLog, Long> TIMESTAMP;

  public static TextTagField<ProductLog, String> ID;

  public static NumericField<ProductLog, Long> PRODUCT_ID;

  public static NumericField<ProductLog, Long> USER_ID;

  public static MetamodelField<ProductLog, String> _KEY;

  public static MetamodelField<ProductLog, ProductLog> _THIS;

  static {
    try {
      timestamp = com.redis.om.spring.util.ObjectUtils.getDeclaredFieldTransitively(ProductLog.class, "timestamp");
      id = com.redis.om.spring.util.ObjectUtils.getDeclaredFieldTransitively(ProductLog.class, "id");
      productId = com.redis.om.spring.util.ObjectUtils.getDeclaredFieldTransitively(ProductLog.class, "productId");
      userId = com.redis.om.spring.util.ObjectUtils.getDeclaredFieldTransitively(ProductLog.class, "userId");
      TIMESTAMP = new NumericField<ProductLog, Long>(new SearchFieldAccessor("timestamp", "$.timestamp", timestamp),true);
      ID = new TextTagField<ProductLog, String>(new SearchFieldAccessor("id", "$.id", id),true);
      PRODUCT_ID = new NumericField<ProductLog, Long>(new SearchFieldAccessor("productId", "$.productId", productId),true);
      USER_ID = new NumericField<ProductLog, Long>(new SearchFieldAccessor("userId", "$.userId", userId),true);
      _KEY = new MetamodelField<ProductLog, String>("__key", String.class, true);
      _THIS = new MetamodelField<ProductLog, ProductLog>("__this", ProductLog.class, true);
    } catch(NoSuchFieldException | SecurityException e) {
      System.err.println(e.getMessage());
    }
  }
}
