package com.dinhphu28.drvinschl.model;

import java.util.List;
import java.util.UUID;

public record BulkRegisterRequest(UUID examSessionId, List<UUID> studentIds) {
}
